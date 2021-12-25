import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  root: {padding: 20, minHeight: 300},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {
    marginTop: 0,
    width: 170, 
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 15,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
  },
});