import {COLORS, FONT_SIZE} from "../../utils/constants";

export const styles = {

  error: {
  fontSize : 12,
  color: 'red'
  },
   label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 15,
    fontSize: 15,
    fontWeight:500,
    color: COLORS.dark_gray,
    backgroundColor: "#F9F9F9"
  },
    inputOnFocused : {
        borderWidth : 0,
    },

    btnSearch : {
        marginRight: 10,
        marginTop: 5,
        color:COLORS.dark_gray
    }
}