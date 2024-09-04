import { StyleSheet } from 'react-native';

const Inputstyles = StyleSheet.create({
  dailyAllowanceContainer: {
    margin: 12,
  },
  clearBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
    marginLeft: 4,
  },
  saveBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginRight: 4,

  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  textLabel: {
    fontWeight: '600',
    fontSize: 14,
    margin: 8,
    color: 'gray',
  },
  deposit: {
    backgroundColor: 'rgba(255, 199, 23, 1)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
  },
  optional: {
    color: 'wheat',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default Inputstyles;
