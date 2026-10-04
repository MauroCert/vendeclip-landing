import Foundation
import CoreText
import CoreGraphics
let url = URL(fileURLWithPath: CommandLine.arguments[1])
let descriptors = CTFontManagerCreateFontDescriptorsFromURL(url as CFURL) as? [CTFontDescriptor]
guard let descriptor = descriptors?.first else { fatalError("Unable to load the supplied wordmark font") }
let mode = CommandLine.arguments[3]
let weightDescriptor = CTFontDescriptorCreateCopyWithVariation(descriptor, 2003265652 as NSNumber, 600)
let font = CTFontCreateWithFontDescriptor(weightDescriptor, 140, nil)
let label = mode == "custom" ? "vendeclip" : "VendeClip"
let attrs: [NSAttributedString.Key: Any] = [NSAttributedString.Key(kCTFontAttributeName as String): font, NSAttributedString.Key(kCTKernAttributeName as String): -2.5]
let line = CTLineCreateWithAttributedString(NSAttributedString(string: label, attributes: attrs))
var output = ""
func n(_ v: CGFloat) -> String { String(format: "%.3f", Double(v)) }
for run in CTLineGetGlyphRuns(line) as! [CTRun] {
  let count = CTRunGetGlyphCount(run)
  var glyphs = [CGGlyph](repeating: 0, count: count)
  var positions = [CGPoint](repeating: .zero, count: count)
  CTRunGetGlyphs(run, CFRange(location: 0,length: 0), &glyphs)
  CTRunGetPositions(run, CFRange(location: 0,length: 0), &positions)
  for i in 0..<count {
    if mode == "custom" && i == 0 {
      let x = positions[i].x
      output += "M\(n(x+2)) 76L\(n(x+19)) 76L\(n(x+40)) 18L\(n(x+61)) 76L\(n(x+78)) 76L\(n(x+51)) 7Q\(n(x+48)) -1 \(n(x+40)) -1Q\(n(x+32)) -1 \(n(x+29)) 7Z"
      continue
    }
    if mode == "custom" && i == 7 {
      let x = positions[i].x
      output += "M\(n(x+9)) 0V76H\(n(x+24))V0ZM\(n(x+9)) 90L\(n(x+24)) 95V110L\(n(x+9)) 105Z"
      continue
    }
    var transform = CGAffineTransform(translationX: positions[i].x, y: positions[i].y)
    if let path = CTFontCreatePathForGlyph(font, glyphs[i], &transform) {
      path.applyWithBlock { pointer in
        let e = pointer.pointee
        switch e.type {
        case .moveToPoint: output += "M\(n(e.points[0].x)) \(n(e.points[0].y))"
        case .addLineToPoint: output += "L\(n(e.points[0].x)) \(n(e.points[0].y))"
        case .addQuadCurveToPoint: output += "Q\(n(e.points[0].x)) \(n(e.points[0].y)) \(n(e.points[1].x)) \(n(e.points[1].y))"
        case .addCurveToPoint: output += "C\(n(e.points[0].x)) \(n(e.points[0].y)) \(n(e.points[1].x)) \(n(e.points[1].y)) \(n(e.points[2].x)) \(n(e.points[2].y))"
        case .closeSubpath: output += "Z"
        @unknown default: break
        }
      }
    }
  }
}
let data: [String: Any] = ["path": output, "width": CTLineGetTypographicBounds(line, nil, nil, nil), "font": CTFontCopyPostScriptName(font) as String]
let json = try JSONSerialization.data(withJSONObject: data, options: .prettyPrinted)
try json.write(to: URL(fileURLWithPath: CommandLine.arguments[2]))
print("Outlined wordmark: \(CTFontCopyPostScriptName(font))")
