import Foundation
import CoreText
import CoreGraphics
// Selected Soft Studio wordmark: Avenir Next Demi Bold, custom l and i.
// Outlined once on macOS; normal asset generation only needs wordmark.json.
let font = CTFontCreateWithName("AvenirNext-DemiBold" as CFString, 140, nil)
let attrs: [NSAttributedString.Key: Any] = [NSAttributedString.Key(kCTFontAttributeName as String): font, NSAttributedString.Key(kCTKernAttributeName as String): -3.5]
let line = CTLineCreateWithAttributedString(NSAttributedString(string: "VendeClip", attributes: attrs))
var output = ""
func n(_ v: CGFloat) -> String { String(format: "%.3f", Double(v)) }
for run in CTLineGetGlyphRuns(line) as! [CTRun] {
  let count = CTRunGetGlyphCount(run)
  var glyphs = [CGGlyph](repeating: 0, count: count)
  var positions = [CGPoint](repeating: .zero, count: count)
  CTRunGetGlyphs(run, CFRange(location: 0,length: 0), &glyphs)
  CTRunGetPositions(run, CFRange(location: 0,length: 0), &positions)
  for i in 0..<count {
    if i == 7 {
      let x = positions[i].x
      let w = 15.0
      output += "M\(n(x+8)) 0V76H\(n(x+8+w))V0ZM\(n(x+8)) 92L\(n(x+8+w)) 97V\(n(97+w))L\(n(x+8)) \(n(92+w))Z"
      continue
    }
    if i == 6 {
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
try json.write(to: URL(fileURLWithPath: CommandLine.arguments[1]))
print("Outlined wordmark: \(CTFontCopyPostScriptName(font))")
