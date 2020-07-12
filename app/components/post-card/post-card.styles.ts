import { ViewStyle, TextStyle } from "react-native"
import { color, typography } from "../../theme"

export const postCardStyles = {
  WRAPPER: {
    justifyContent: 'center',
  } as ViewStyle,
  TEXT: {
    fontFamily: typography.primary,
    fontSize: 14,
    color: color.primary
  } as TextStyle,
  listItemAreas: {
    margin: 15,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.palette.white
  } as ViewStyle,
  listTextArea: {
    paddingHorizontal: 10,
    marginHorizontal: 5,
    flex: 1,
  } as ViewStyle,
  listTitle: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 25,
  } as TextStyle,
}
