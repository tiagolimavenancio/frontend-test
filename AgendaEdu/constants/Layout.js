import Theme from "./Theme";

export default {
  grid: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  col: {
    flexDirection: 'column'
  },
  padding: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  marginVertical: {
    marginVertical: 24
  },
  marginVertical8:{
    marginVertical: 8
  },

  // Resolve Native-base bug for firstListItem
  firstListItem:{
    marginLeft: 0,
    paddingLeft: 15
  },
  // Custom List
  listHeight:{
    height: 58,
  },
  listItemBody: {
    height: 58,
  },
  listItemChevron:{
    height: 58,
    borderBottomWidth: Theme.borderWidth,
    borderBottomColor: Theme.listBorderColor,
    paddingHorizontal: 8,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  // Modal
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  modalBody: {
    backgroundColor: 'white'
  }
}
