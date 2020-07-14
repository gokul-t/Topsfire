import { Dimensions, ViewStyle, TextStyle } from "react-native"
import { color, typography } from "../../theme"
const windowWidth = Dimensions.get("window").width

export const postCardStyles = {
  WRAPPER: {
    justifyContent: "center",
  } as ViewStyle,
  TEXT: {
    fontFamily: typography.primary,
    fontSize: 14,
    color: color.primary,
  } as TextStyle,
  CARD: {
    margin: 15,
    flex: 1,
    flexDirection: "row",
    backgroundColor: color.palette.white,
    maxWidth: windowWidth * .9
  } as ViewStyle,
  CARD2: {
    margin: 15,
    backgroundColor: color.palette.white,
    maxWidth: windowWidth * .9
  } as ViewStyle,
  CardContent: {
    paddingHorizontal: 10,
    marginHorizontal: 5,
    flex: 1,
  } as ViewStyle,
}
