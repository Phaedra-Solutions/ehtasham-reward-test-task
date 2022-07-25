import { useEffect, useState } from "react";
import ReactTable from "react-table";
import axios from "axios";
import "./App.css";

function App() {
  const [transactionData, setTransactionData] = useState(null);

  const allCustomersCols = [
    {
      Header: "Customer Id",
      accessor: "customerId",
    },
    {
      Header: "Customer Name",
      accessor: "customerName",
    },
  ];

  const allTransactionCols = [
    {
      Header: "Customer Id",
      accessor: "customerId",
    },
    {
      Header: "Customer Name",
      accessor: "customerName",
    },
    {
      Header: "Transaction Amount",
      accessor: "transactionAmount",
    },
    {
      Header: "Transaction Date",
      accessor: "transactionDate",
    },
  ];

  const perMonthRewardscolumns = [
    {
      Header: "Customer Id",
      accessor: "customerId",
    },
    {
      Header: "Customer Name",
      accessor: "customerName",
    },
    {
      Header: "Month",
      accessor: "monthName",
    },
    {
      Header: "# of Transactions",
      accessor: "totalTransactions",
    },
    {
      Header: "Reward Points",
      accessor: "points",
    },
  ];

  const totalsByColumns = [
    {
      Header: "Customer Name",
      accessor: "customerName",
    },
    {
      Header: "Points",
      accessor: "points",
    },
  ];

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/retailer/rewards");
      const transactions = data.data;

      transactions.allCustomersList = transactions.transactionsList.filter((trans, index) => {
        if (
          transactions.transactionsList.findIndex((el) => el.customerId === trans.customerId) ===
          index
        ) {
          return { customerId: trans.customerId, customerName: trans.customerName };
        }
      });

      setTransactionData(transactions);
    } catch (error) {
      console.log(error);
    }
  };

  return transactionData == null ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div className="mb-4 p-2">
        <div class="row">
          <div class="col-6">
            <div className="row">
              <div className="col-10">
                <h2>Transactions List</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <ReactTable
                  data={transactionData.transactionsList}
                  columns={allTransactionCols}
                  defaultPageSize={10}
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div className="row">
              <div className="col-10">
                <h2>Rewards Totals Of Customer By Months</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <ReactTable
                  data={transactionData.totalPointsOfCustomerPerMonth}
                  defaultPageSize={10}
                  columns={perMonthRewardscolumns}
                  SubComponent={(row) => {
                    console.log(row);
                    return (
                      <div>
                        {row.original.transactions.map((transaction) => {
                          return (
                            <div className="container" style={{ background: "#fff3f3" }}>
                              <div className="row">
                                <div className="col-8">
                                  <strong>Transaction Date:</strong> {transaction.transactionDate} -{" "}
                                  <strong>$</strong>
                                  {transaction.transactionAmount} - <strong>Points: </strong>
                                  {transaction.points}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container mb-4"></div> */}

      <div>
        <div class="row">
          <div class="col-6">
            <div className="row">
              <div className="col-10">
                <h2>Customers List</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <ReactTable
                  data={transactionData.allCustomersList}
                  columns={allCustomersCols}
                  defaultPageSize={5}
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div className="row">
              <div className="col-10">
                <h2>Rewards Totals of Customers By 3 Months</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <ReactTable
                  data={transactionData.totalPointsPerCustomer}
                  columns={totalsByColumns}
                  defaultPageSize={5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
