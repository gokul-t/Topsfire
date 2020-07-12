import { ViewStyle, TextStyle } from "react-native"
import { color, spacing } from "../../theme"
const BOLD: TextStyle = { fontWeight: "bold" }

export const baseLayoutStyles = {
  FULL: {
    flex: 1
  } as ViewStyle,
  CONTAINER: {
    backgroundColor: color.transparent,
    paddingHorizontal: spacing[4],
  } as ViewStyle,
  BOLD: BOLD,
  HEADER: {
    paddingTop: spacing[3],
    paddingBottom: spacing[5] - 1,
    paddingHorizontal: 0,
  } as TextStyle,
  HEADER_TITLE: {
    ...BOLD,
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
    letterSpacing: 1.5,
  } as TextStyle,
  SCREEN: {
    marginBottom: 10
  } as ViewStyle
}
