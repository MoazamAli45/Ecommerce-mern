import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import Skeleton from "@mui/material/Skeleton";

import { Box } from "@mui/material";
// import Swal from "sweetalert2";

//  for getting data

import { useDispatch, useSelector } from "react-redux";

import { getAllProducts } from "./../../../../store/productReducer";

function ProductList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [category, setCategory] = useState("menKurtas");
  const dispatch = useDispatch();

  const { products, isLoading, error } = useSelector((state) => state.product);

  console.log(products);
  // getting data
  useEffect(() => {
    const data = {
      category: category,
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      stock: [],
      sort: "price_high_to_low",
      pageNumber: 0,
      pageSize: rowsPerPage,
    };

    dispatch(getAllProducts(data));
  }, [dispatch, category, rowsPerPage]);

  //   const { rowsData, setRowsList } = useContext(DataContext);
  // using useContext
  // const [rows, setRows] = useState(rowsData);

  //   const emptyCollectionRef = collection(db, "products");
  //   // now getting data from firebase
  //   // wrap this function in useCallback

  //   const getData = useCallback(async () => {
  //     const data = await getDocs(emptyCollectionRef);
  //     setRowsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   }, [emptyCollectionRef, setRowsList]);

  //   useEffect(() => {
  //     getData();
  //   }, []); // I want only one time rerendering so

  // console.log(rowsData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  console.log(category);

  //   const deleteProductHandler = (id) => {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#d33",
  //       cancelButtonColor: "#3f51b5",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then((result) => {
  //       if (result.value) {
  //         // deleteApi(id); // now this will delete form firebase
  //       }
  //     });
  //   };

  // deletinvg functionn from firebase
  //   const deleteApi = async (id) => {
  //     // selecting the document to be deleted
  //     const userDocument = doc(db, "products", id);
  //     await deleteDoc(userDocument);
  //     Swal.fire("Deleted", "Item deleted Successfully", "success");
  //     // now again fetch Dtaa
  //     getData();
  //   };

  // filtering Data
  //   const filterData = (v) => {
  //     if (v) {
  //       console.log(v);
  //       setRowsList([v]);
  //     } else {
  //       console.log("no data");
  //       getData();
  //     }
  //   };

  /// Modal Opening Handler

  // for edit modal

  return (
    <div className="w-full">
      {isLoading && (
        <>
          <Paper
            sx={{
              width: {
                xs: "80vw",
                md: "90vw",
              },
              height: {
                xs: "60vh",
                md: "80vh",
              },
              overflow: "hidden",
              padding: "12px",
            }}
          >
            <Box height={20} />
            <Skeleton variant="rectangular" width="100%" height={50} />
            <Box height={20} />
            <Skeleton variant="rectangular" width="100%" height={30} />
            <Box height={20} />
            <Skeleton variant="rectangular" width="100%" height={30} />
            <Box height={20} />
            <Skeleton variant="rectangular" width="100%" height={30} />
            <Box height={20} />
            <Skeleton variant="rectangular" width="100%" height={30} />
            <Box height={20} />
            <Skeleton variant="rectangular" width="100%" height={30} />
            <Box height={20} />
            <Skeleton variant="rectangular" width="100%" height={30} />
            <Box height={20} />
            <Skeleton variant="rectangular" width="100%" height={30} />
            <Box height={20} />
            <Skeleton variant="rectangular" width="100%" height={30} />
          </Paper>
        </>
      )}

      {!isLoading && (
        <Paper
          sx={{
            maxWidth: {
              xs: "80vw",
              md: "100%",
            },
            overflow: "hidden",
            padding: "12px",
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ padding: "20px" }}
            >
              Products List
            </Typography>
            <Stack direction="row" spacing={2} className="my-2 mb-2 mr-2 ">
              {/*       MENU     */}
              <FormControl className="w-[20%]">
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value={"menKurtas"}>Men Kurtas</MenuItem>
                  <MenuItem value={"dresses"}>Woman Dresses</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align={"left"}
                    style={{
                      minWidth: {
                        md: "200px",
                      },
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align={"left"}
                    style={{
                      minWidth: {
                        md: "200px",
                      },
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    align={"left"}
                    style={{
                      minWidth: {
                        md: "200px",
                      },
                    }}
                  >
                    Price
                  </TableCell>

                  <TableCell
                    align={"left"}
                    style={{
                      minWidth: {
                        md: "200px",
                      },
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    align={"left"}
                    style={{
                      minWidth: {
                        md: "200px",
                      },
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[1, 1, 1, 1]
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell
                          align={"left"}
                          sx={{
                            minWidth: {
                              md: "200px",
                            },
                          }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          align={"left"}
                          sx={{
                            minWidth: {
                              md: "200px",
                            },
                          }}
                        >
                          {row.category}
                        </TableCell>
                        <TableCell
                          align={"left"}
                          sx={{
                            minWidth: {
                              md: "200px",
                            },
                          }}
                        >
                          {row.price}
                        </TableCell>
                        <TableCell
                          align={"left"}
                          sx={{
                            minWidth: {
                              md: "200px",
                            },
                          }}
                        >
                          {row.date}
                        </TableCell>
                        <TableCell
                          align={"left"}
                          sx={{
                            minWidth: {
                              md: "200px",
                            },
                          }}
                        >
                          <Stack direction="row" spacing={2}>
                            <DeleteIcon
                              sx={{
                                fontSize: "1.2rem",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteProductHandler(row.id);
                              }}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10]}
            component="div"
            // count={rowsData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </div>
  );
}

export default React.memo(ProductList);
