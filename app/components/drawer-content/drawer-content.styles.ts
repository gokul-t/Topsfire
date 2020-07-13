import { ViewStyle, TextStyle, StyleSheet } from "react-native"
import { color, typography } from "../../theme"

export const drawerContentStyles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    padding: 20,
  },
  title: {
    color: color.palette.white,
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    color: color.palette.white,
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
