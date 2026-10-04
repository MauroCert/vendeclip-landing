import Foundation
import CoreText
import CoreGraphics
let url = URL(fileURLWithPath: CommandLine.arguments[1])
let descriptors = CTFontManagerCreateFontDescriptorsFromURL(url as CFURL) as? [CTFontDescriptor]
guard let descriptor = descriptors?.first else { fatalError("Unable to load the supplied wordmark font") }
let mode = CommandLine.arguments[3]
let weight = mode == "air" ? 500.0 : mode == "sculpt" ? 700.0 : 600.0
let weightDescriptor = CTFontDescriptorCreateCopyWithVariation(descriptor, 2003265652 as NSNumber, CGFloat(weight))
let font = mode == "soft" ? CTFontCreateWithName("AvenirNext-DemiBold" as CFString, 140, nil) : CTFontCreateWithFontDescriptor(weightDescriptor, 140, nil)
let label = "vendeclip"
let attrs: [NSAttributedString.Key: Any] = [NSAttributedString.Key(kCTFontAttributeName as String): font, NSAttributedString.Key(kCTKernAttributeName as String): (mode == "air" ? 1.5 : mode == "wide" ? 0.0 : -3.5)]
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
    if (mode == "sculpt" || mode == "air") && i == 0 {
      let x = positions[i].x
      output += "M\(n(x+2)) 76L\(n(x+19)) 76L\(n(x+40)) 18L\(n(x+61)) 76L\(n(x+78)) 76L\(n(x+51)) 7Q\(n(x+48)) -1 \(n(x+40)) -1Q\(n(x+32)) -1 \(n(x+29)) 7Z"
      continue
    }
    if i == 7 {
      let x = positions[i].x
      let w = mode == "air" ? 12.0 : mode == "sculpt" ? 19.0 : 15.0
      output += "M\(n(x+8)) 0V76H\(n(x+8+w))V0ZM\(n(x+8)) 92L\(n(x+8+w)) 97V\(n(97+w))L\(n(x+8)) \(n(92+w))Z"
      continue
    }
    if mode == "soft" && i == 6 {
      let x = positions[i].x
      output += "M\(n(x+7)) 106H\(n(x+23))V22Q\(n(x+23)) 12 \(n(x+33)) 12H\(n(x+37))V0H\(n(x+29))Q\(n(x+7)) 0 \(n(x+7)) 22Z"
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
