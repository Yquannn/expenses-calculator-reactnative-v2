import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
  },
  balanceContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
  },
  card: {
    minWidth: 300,
    minHeight: 180,
    backgroundColor: 'rgba(0, 0, 0, 0.81)',
    margin: 16,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: { height: 1, width: 0.3 },
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceLbl: {
    color: 'rgba(208, 208, 206, 1)',
    margin: 12,
  },
  balanceCurrency: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  balance: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'rgba(255, 199, 23, 1)',
  },
  accountNumberLbl: {
    color: '#fff',
    textAlign: 'right',
    marginTop: 4,
    marginRight: 12,
  },
  accountNumber: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 22,
  },
  horizontalLine: {
    height: 1,
    width: '90%',
    backgroundColor: 'white',
    marginVertical: 6,
    alignSelf: 'center',
  },
  ExpensesCurrency: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
  },
  Expensesbalance: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'rgba(255, 199, 23, 1)',
  },


});

export default styles;
