import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, CircularProgress, MenuItem, IconButton, FormControl, InputLabel, Select, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { 
    __getAccidentTypeAndCauseList, 
    __getAccidentList, 
    __saveAccident, 
    __updateAccident, 
    __deleteAccident 
} from "../../utils/api/commonApi";

const AccidentMasterList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);
    const [accidentLookupData, setAccidentLookupData] = useState({ type: [], cause: [] });
    const [accidentList, setAccidentList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAccident, setSelectedAccident] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        AccidentDate: "",
        AccidentTime: "",
        AccidentTypeId: "",
        CauseId: "",
        AccidentSite: "",
        GeoLocation: "",
        StationId: "",
        DriverId: "",
        VehicleId: "",
        ConductorId: "",
        DamageValue: "",
        Fatalities: "",
        Injuries: "",
        VehicleDisruptionDays: "",
        DriverOffDutyDays: "",
        Comments: ""
    });

    const columns = [
        {
            field: "AccidentDate", headerName: "Accident Date", width: 120, headerClassName: "blue-header", headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return new Date(params.value).toLocaleDateString();
            }
        },
        {
            field: "AccidentTime", headerName: "Time", width: 100, headerClassName: "blue-header", headerAlign: "center",
            align: "center"
        },
        {
            field: "AccidentTypeId", headerName: "Accident Type", width: 150, headerClassName: "blue-header", headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return params.row.AccidentTypeId?.LookupTitle || "N/A";
            }
        },
        {
            field: "AccidentSite", headerName: "Accident Site", width: 200, headerClassName: "blue-header", headerAlign: "center",
            align: "center"
        },
        {
            field: "CauseId", headerName: "Cause", width: 150, headerClassName: "blue-header", headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return params.row.CauseId?.LookupTitle || "N/A";
            }
        },
        {
            field: "Fatalities", headerName: "Fatalities", width: 100, headerClassName: "blue-header", headerAlign: "center",
            align: "center"
        },
        {
            field: "Injuries", headerName: "Injuries", width: 100, headerClassName: "blue-header", headerAlign: "center",
            align: "center"
        },
        {
            field: "DamageValue", headerName: "Damage (₹)", width: 120, headerClassName: "blue-header", headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return `₹${params.value?.toLocaleString() || 0}`;
            }
        },
        {
            field: "actions", headerName: "Actions", width: 120, headerClassName: "blue-header", headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Box>
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditAccident(params.row)}
                    >
                        Edit
                    </IconButton>
                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteAccident(params.row._id)}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            )
        },
    ];

    // Remove static rows - we'll use dynamic data from API



    // Handle multiple image selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...newFiles]);
    };

    // Handle multiple video selection
    const handleVideoChange = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setVideos((prev) => [...prev, ...newFiles]);
    };

    // Handle PDF file selection
    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPdfFile(file);
        }
    };

    // Remove image
    const handleRemoveImage = (index) => {
        setImages((prev) => {
            const updated = [...prev];
            // Only revoke URL if it's a local preview (not from existing data)
            if (updated[index].file) {
                URL.revokeObjectURL(updated[index].preview);
            }
            updated.splice(index, 1);
            return updated;
        });
    };

    // Remove video
    const handleRemoveVideo = (index) => {
        setVideos((prev) => {
            const updated = [...prev];
            // Only revoke URL if it's a local preview (not from existing data)
            if (updated[index].file) {
                URL.revokeObjectURL(updated[index].preview);
            }
            updated.splice(index, 1);
            return updated;
        });
    };

    // Remove PDF file
    const handleRemovePdf = () => {
        setPdfFile(null);
    };
    //=============== API Functions ===============\\
    
    // Get accident list
    const getAccidentList = async () => {
        try {
            setIsLoading(true);
            const data = {
                page: currentPage,
                limit: pageSize,
                search: searchTerm
            };
            const response = await __getAccidentList(data);
            setAccidentList(response.list || []);
            setTotalCount(response.total || 0);
        } catch (error) {
            console.error("Error fetching accident list:", error);
            toast.error("Failed to fetch accident list");
        } finally {
            setIsLoading(false);
        }
    };

    // Get lookup data for accident types and causes
    const __getLookupAccidentData = async (lookType) => {
        try {
            let data = {
                Category: lookType,
            }
            const res = await __getAccidentTypeAndCauseList(data);
            if (res.length > 0) {
                if(lookType === "Cause") {
                    setAccidentLookupData(prev => ({ ...prev, cause: res }))
                } else if(lookType === "Type") {
                    setAccidentLookupData(prev => ({ ...prev, type: res }))
                };
            } else {
                console.log(`No ${lookType} data found`);
            }
        } catch (error) {
            console.error(`Error fetching ${lookType} data:`, error);
        }
    };

    // Form validation
    const validateForm = () => {
        if (!formData.AccidentDate) {
            toast.error("Accident Date is required");
            return false;
        }
        if (!formData.AccidentTime) {
            toast.error("Accident Time is required");
            return false;
        }
        if (!formData.AccidentTypeId) {
            toast.error("Accident Type is required");
            return false;
        }
        if (!formData.CauseId) {
            toast.error("Cause of Accident is required");
            return false;
        }
        if (!formData.AccidentSite) {
            toast.error("Accident Site is required");
            return false;
        }
        return true;
    };

    // Save accident
    const handleSaveAccident = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            setIsSubmitting(true);
            
            // Create FormData for file uploads
            const formDataToSend = new FormData();
            
            // Add form fields
            Object.keys(formData).forEach(key => {
                if (formData[key] !== "") {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Add files - only send actual files, not null values
            images.forEach((img, index) => {
                if (img.file) {
                    formDataToSend.append('images', img.file);
                }
            });
            
            videos.forEach((vid, index) => {
                if (vid.file) {
                    formDataToSend.append('videos', vid.file);
                }
            });

            // Add PDF file - only if it's a new file
            if (pdfFile && pdfFile instanceof File) {
                formDataToSend.append('report', pdfFile);
            }

            let response;
            if (isEditMode && selectedAccident) {
                formDataToSend.append('accident_id', selectedAccident._id);
                response = await __updateAccident(formDataToSend);
                toast.success("Accident updated successfully");
            } else {
                response = await __saveAccident(formDataToSend);
                toast.success("Accident created successfully");
            }

            // Reset form and refresh list
            resetForm();
            getAccidentList();
            
        } catch (error) {
            console.error("Error saving accident:", error);
            toast.error(error.message || "Failed to save accident");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Edit accident
    const handleEditAccident = (accident) => {
        setSelectedAccident(accident);
        setIsEditMode(true);
        
        // Populate form with accident data
        setFormData({
            AccidentDate: accident.AccidentDate ? new Date(accident.AccidentDate).toISOString().split('T')[0] : "",
            AccidentTime: accident.AccidentTime || "",
            AccidentTypeId: accident.AccidentTypeId?._id || "",
            CauseId: accident.CauseId?._id || "",
            AccidentSite: accident.AccidentSite || "",
            GeoLocation: accident.GeoLocation ? 
                `${accident.GeoLocation.latitude}, ${accident.GeoLocation.longitude}` : "",
            StationId: accident.StationId?._id || "",
            DriverId: accident.DriverId?._id || "",
            VehicleId: accident.VehicleId?._id || "",
            ConductorId: accident.ConductorId?._id || "",
            DamageValue: accident.DamageValue || "",
            Fatalities: accident.Fatalities || "",
            Injuries: accident.Injuries || "",
            VehicleDisruptionDays: accident.VehicleDisruptionDays || "",
            DriverOffDutyDays: accident.DriverOffDutyDays || "",
            Comments: accident.Comments || ""
        });

        // Set existing media files
        setImages(accident.AccidentImages?.map(img => ({
            file: null,
            preview: img.imageUrl
        })) || []);
        
        setVideos(accident.AccidentVideos?.map(vid => ({
            file: null,
            preview: vid.videoUrl
        })) || []);

        // Set existing PDF file
        if (accident.FactFindingReport?.reportUrl) {
            setPdfFile({
                name: "Existing Report.pdf",
                url: accident.FactFindingReport.reportUrl
            });
        } else {
            setPdfFile(null);
        }
    };

    // Delete accident
    const handleDeleteAccident = async (accidentId) => {
        if (window.confirm("Are you sure you want to delete this accident record?")) {
            try {
                setIsLoading(true);
                await __deleteAccident({ accident_id: accidentId });
                toast.success("Accident deleted successfully");
                getAccidentList();
            } catch (error) {
                console.error("Error deleting accident:", error);
                toast.error("Failed to delete accident");
        } finally {
            setIsLoading(false);
            }
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            AccidentDate: "",
            AccidentTime: "",
            AccidentTypeId: "",
            CauseId: "",
            AccidentSite: "",
            GeoLocation: "",
            StationId: "",
            DriverId: "",
            VehicleId: "",
            ConductorId: "",
            DamageValue: "",
            Fatalities: "",
            Injuries: "",
            VehicleDisruptionDays: "",
            DriverOffDutyDays: "",
            Comments: ""
        });
        setImages([]);
        setVideos([]);
        setPdfFile(null);
        setSelectedAccident(null);
        setIsEditMode(false);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle search with debouncing
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm !== undefined) {
                getAccidentList();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    // Handle pagination
    const handlePageChange = (params) => {
        setCurrentPage(params.page + 1);
    };

    useEffect(() => {
        getAccidentList();
    }, [currentPage, pageSize]);

    useEffect(() => {
        __getLookupAccidentData("Type");
        __getLookupAccidentData("Cause");
    }, []);

    // Cleanup effect to prevent memory leaks
    useEffect(() => {
        return () => {
            // Cleanup image and video URLs
            images.forEach(img => {
                if (img.file) {
                    URL.revokeObjectURL(img.preview);
                }
            });
            videos.forEach(vid => {
                if (vid.file) {
                    URL.revokeObjectURL(vid.preview);
                }
            });
        };
    }, [images, videos]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                    Accident Master Form
                </h1>
                <Button
                    variant="outlined"
                    onClick={resetForm}
                    disabled={isSubmitting}
                >
                    {isEditMode ? "Cancel Edit" : "Clear Form"}
                </Button>
            </div>
            <div className="grid grid-cols-12 gap-6 w-full mx-auto">
                {/* Form Section */}
                <div className="bg-white py-3 border px-3 rounded-xl col-span-12 lg:col-span-5">
                    {/* Make form container flex + column layout */}
                    <form onSubmit={handleSaveAccident} className="flex flex-col h-[500px] rounded-lg">
                        {/* Scrollable fields */}
                        <div className="flex-1 overflow-y-auto space-y-5 p-4 pr-2 hide-scrollbar">
                            <TextField
                                label="Accident Date"
                                name="AccidentDate"
                                type="date"
                                fullWidth
                                required
                                value={formData.AccidentDate}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextField
                                label="Accident Time"
                                name="AccidentTime"
                                type="time"
                                fullWidth
                                required
                                value={formData.AccidentTime}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                            />
                            
                            <FormControl fullWidth required>
                                <InputLabel>Accident Type</InputLabel>
                                <Select
                                    name="AccidentTypeId"
                                    value={formData.AccidentTypeId}
                                    onChange={handleInputChange}
                                    label="Accident Type"
                                >
                                    {accidentLookupData?.type.map((type) => (
                                    <MenuItem key={type?._id} value={type?._id}>
                                        {type?.LookupTitle}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            
                            <FormControl fullWidth required>
                                <InputLabel>Cause of Accident</InputLabel>
                                <Select
                                    name="CauseId"
                                    value={formData.CauseId}
                                    onChange={handleInputChange}
                                    label="Cause of Accident"
                                >
                                    {accidentLookupData?.cause.map((cause) => (
                                    <MenuItem key={cause?._id} value={cause?._id}>
                                        {cause?.LookupTitle}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            
                            <TextField 
                                label="Accident Site (Address)" 
                                name="AccidentSite"
                                placeholder="Enter Address" 
                                fullWidth 
                                required 
                                value={formData.AccidentSite}
                                onChange={handleInputChange}
                            />
                            <TextField 
                                label="Geolocation" 
                                name="GeoLocation"
                                placeholder="Enter Latitude, Longitude" 
                                fullWidth 
                                value={formData.GeoLocation}
                                onChange={handleInputChange}
                            />
                            <TextField 
                                label="Station ID" 
                                name="StationId"
                                fullWidth 
                                value={formData.StationId}
                                onChange={handleInputChange}
                            />
                            <TextField 
                                label="Asset ID (Driver)" 
                                name="DriverId"
                                fullWidth 
                                value={formData.DriverId}
                                onChange={handleInputChange}
                            />
                            <TextField 
                                label="Asset ID (Vehicle)" 
                                name="VehicleId"
                                fullWidth 
                                value={formData.VehicleId}
                                onChange={handleInputChange}
                            />
                            <TextField 
                                label="Asset ID (Conductor)" 
                                name="ConductorId"
                                fullWidth 
                                value={formData.ConductorId}
                                onChange={handleInputChange}
                            />

                            {/* Image Upload */}
                            <TextField
                                type="file"
                                label="Accident Images"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ multiple: true, accept: "image/*" }}
                                onChange={handleImageChange}
                            />

                            {/* Image Preview */}
                            {images.length > 0 && (
                                <div className="flex flex-wrap gap-3 mt-3">
                                    {images.map((img, idx) => (
                                        <div key={idx} className="relative">
                                            <img
                                                src={img.preview}
                                                alt={`preview-${idx}`}
                                                className="w-28 h-28 object-cover rounded-lg border"
                                            />
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleRemoveImage(idx)}
                                                className="!absolute -top-2 -right-2 bg-white shadow-md"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Video Upload */}
                            <TextField
                                type="file"
                                label="Accident Videos"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ multiple: true, accept: "video/*" }}
                                onChange={handleVideoChange}
                            />

                            {/* Video Preview */}
                            {videos.length > 0 && (
                                <div className="flex flex-wrap gap-3 mt-3">
                                    {videos.map((vid, idx) => (
                                        <div key={idx} className="relative">
                                            <video
                                                src={vid.preview}
                                                controls
                                                className="w-40 h-28 object-cover rounded-lg border"
                                            />
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleRemoveVideo(idx)}
                                                className="!absolute -top-2 -right-2 bg-white shadow-md"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <TextField 
                                type="file" 
                                label="Fact Finding Report (PDF)" 
                                fullWidth 
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ accept: "application/pdf" }}
                                onChange={handlePdfChange}
                            />
                            {pdfFile && (
                                <div className="mt-2 p-2 bg-green-100 rounded relative">
                                    <p className="text-sm text-green-800">
                                        Selected: {pdfFile.name || (pdfFile.url ? "Existing Report.pdf" : "No file selected")}
                                    </p>
                                    {pdfFile.url && (
                                        <a 
                                            href={pdfFile.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline text-xs"
                                        >
                                            View existing report
                                        </a>
                                    )}
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={handleRemovePdf}
                                        className="!absolute -top-2 -right-2 bg-white shadow-md"
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </div>
                            )}

                            <TextField 
                                label="Damage Value (INR)" 
                                name="DamageValue"
                                type="number" 
                                fullWidth 
                                value={formData.DamageValue}
                                onChange={handleInputChange}
                            />
                            <TextField 
                                label="Number of Fatalities" 
                                name="Fatalities"
                                type="number" 
                                fullWidth 
                                value={formData.Fatalities}
                                onChange={handleInputChange}
                            />
                            <TextField 
                                label="Number of Injuries" 
                                name="Injuries"
                                type="number" 
                                fullWidth 
                                value={formData.Injuries}
                                onChange={handleInputChange}
                            />
                            <TextField 
                                label="Vehicle Disruptions (Days)" 
                                name="VehicleDisruptionDays"
                                type="number" 
                                fullWidth 
                                value={formData.VehicleDisruptionDays}
                                onChange={handleInputChange}
                            />
                            <TextField 
                                label="Driver Off Duty (Days)" 
                                name="DriverOffDutyDays"
                                type="number" 
                                fullWidth 
                                value={formData.DriverOffDutyDays}
                                onChange={handleInputChange}
                            />
                            <TextField 
                                label="Comments" 
                                name="Comments"
                                multiline 
                                rows={3} 
                                fullWidth 
                                value={formData.Comments}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Fixed Save Button */}
                        <div className="pt-4 border-t ">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isSubmitting}
                                sx={{ mt: 2 }}
                            >
                                {isSubmitting ? "Saving..." : (isEditMode ? "Update Accident" : "Save Accident")}
                                {isSubmitting && (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: "white",
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            marginTop: "-12px",
                                            marginLeft: "-12px",
                                        }}
                                    />
                                )}
                            </Button>
                        </div>
                    </form>
                </div>


                {/* Table Section */}
                <div className="bg-white pb-2 rounded-xl col-span-12 lg:col-span-7">
                    {/* Search Bar */}
                    <div className="p-4 border-b">
                        <TextField
                            fullWidth
                            placeholder="Search accidents..."
                            value={searchTerm}
                            onChange={handleSearch}
                            variant="outlined"
                            size="small"
                        />
                    </div>
                    
                    <DataGrid
                        rows={accidentList}
                        columns={columns}
                        loading={isLoading}
                        autoHeight
                        pagination
                        paginationMode="server"
                        rowCount={totalCount}
                        page={currentPage - 1}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        getRowId={(row) => row._id}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: pageSize, page: 0 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                        disableRowSelectionOnClick
                        sx={{
                            '& .blue-header': {
                                backgroundColor: '#1976d2',
                                color: 'white',
                                fontWeight: 'bold',
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default AccidentMasterList;
