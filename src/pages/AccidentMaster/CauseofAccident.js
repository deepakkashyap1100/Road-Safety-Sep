import { Button, CircularProgress, TextField } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { __postApiData } from "../../utils/api";
import { toast } from "react-toastify";
import { __getAccidentTypeAndCauseList } from "../../utils/api/commonApi";
const CauseofAccident = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [causeofAccidentData, setCauseofAccidentData] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    //==== Data Grid columns definition ======\\
    const columns = [
        {
            field: "_id", headerName: "ID", width: 90, headerClassName: "blue-header", headerAlign: "center",
            align: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        {
            field: "LookupTitle",
            headerName: "Cause of Accident",
            headerClassName: "blue-header",
            width: 200,
            renderCell: (params) => <span>{params.row?.LookupTitle || "N/A"}</span>,
        },
        {
            field: "actions", headerName: "Actions", flex: 1, width: 150, headerClassName: "blue-header", headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            align: "center", renderCell: (params) => (
                <>
                    <div
                        className="flex items-center justify-center cursor-pointer"
                        data-bs-toggle="dropdown"
                    >
                        <MoreVertIcon
                            sx={{ color: "gray", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", marginTop: 2 }}
                            className="h-6 w-6"
                        />
                    </div>

                    {/* Dropdown Menu */}
                    <div
                        className="dropdown-menu border-0 rounded-3"
                        style={{
                            boxShadow:
                                "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
                        }}
                    >
                        <div className="d-flex flex-column">
                            {/* Edit Action */}
                            <span
                                className="font-normal text-base px-2 py-2 cursor-pointer border border-bottom-1"
                                onClick={() => {
                                    alert(`Edit button clicked ${params.row?._id}`)
                                }}
                            >
                                Edit
                            </span>

                            {/* Delete Action */}
                            <span
                                className="font-normal text-base px-2 py-2 cursor-pointer"
                                onClick={() => {
                                    alert(`Delete button clicked ${params.row?._id}`);
                                }}
                            >
                                Delete
                            </span>
                        </div>
                    </div>
                </>
            )
        },
    ];

    //============ Yup schema for form validation ===============\\
    const validationSchema = Yup.object().shape({
        LookupTitle: Yup.string()
            .required("Cause of Accident is required")
            .matches(/^[^\d].*$/, "Cause of Accident cannot start with a number"),
    })

    //========== Formik for handle form data and submit the value ========\\
    const formik = useFormik({
        initialValues: {
            Category: "Cause",
            LookupTitle: "",
            error: null,
            success: null,
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, setFieldValue, resetForm }) => {
            try {
                setSubmitting(true);
                let payload = {
                    Category: values.Category,
                    LookupTitle: values.LookupTitle,
                };
                const res = await __postApiData("/api/v1/Common/accident_lookup", payload)
                if (res.response && res.response.response_code === "201") {
                    toast.success(res.response?.message || "Cause of Accident added successfully");
                    resetForm();
                    _getCauseofAccidentData();
                } else {
                    const errorMsg = res.response?.response_message || res.message || "Failed to add Cause of Accident";
                    toast.error(errorMsg);
                }
            } catch (error) {
                setFieldValue("error", "Something went wrong");
                toast.error(error?.message || error?.response?.data?.message || "Something went wrong");
            } finally {
                setSubmitting(false);
            }
        },
    });
    //=============== function to get cause of accident data ===============\\
    const _getCauseofAccidentData = async () => {
        try {
            setIsLoading(true);
            let data = {
                Category: "Cause",
            }
            const res = await __getAccidentTypeAndCauseList(data);
            if (res.length > 0) {
                setCauseofAccidentData(res);
            } else {
                toast.error("Failed to fetch Cause of Accident data");
            }
        } catch (error) {
            toast.error(error?.message || error?.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        _getCauseofAccidentData();
    }, [])
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Cause of Accident</h1>

            </div>
            <div className="grid  grid-cols-12 gap-6 w-full mx-auto">
                <div className="bg-white rounded-xl  col-span-12 lg:col-span-5">
                    <form onSubmit={formik.handleSubmit} className="space-y-5 border  p-4 rounded-lg">
                        <TextField
                            label="Cause of Accident"
                            name="LookupTitle"
                            value={formik.values?.LookupTitle}
                            onChange={formik.handleChange}
                            fullWidth
                            onBlur={formik.handleBlur}
                            error={formik.touched.LookupTitle && Boolean(formik.errors.LookupTitle)}
                            helperText={formik.touched.LookupTitle && formik.errors.LookupTitle}
                            placeholder="Enter Cause of Accident"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? "Saving..." : "Save"}
                            {formik.isSubmitting && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: 'white',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Button>
                    </form>
                </div>
                <div className="bg-white pb-2 rounded-xl col-span-12 lg:col-span-7">
                    <DataGrid
                        rows={causeofAccidentData}
                        columns={columns}
                        loading={isLoading}
                        autoHeight
                        pagination
                        getRowId={(row) => row._id}   // use MongoDB _id as unique id
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[5, 10]}
                    />
                </div>
            </div>
        </div>
    )
}

export default CauseofAccident
