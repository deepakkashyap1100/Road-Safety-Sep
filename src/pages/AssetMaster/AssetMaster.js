
import { useEffect, useState } from "react";
import { __postApiData } from "../../utils/api";
import { __getCommenApiDataList } from "../../utils/api/commonApi";
import { toast } from "react-toastify";
import { __formatDate } from "../../utils/function";
import LoadingScreen from "../../components/Loading/LoadingScreen";
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Menu,
  Box,
  Tabs,
  Tab,
  Paper
} from "@mui/material";
import { __formatDate2 } from "../../utils/api/constantfun";



export default function AssetMasterForm() {

  // ====================== Individual Columns ======================
  const individualColumns = [
    {
      field: "lookup_value",
      headerName: "Parent Asset ID",
      width: 150,
      headerClassName: "blue-header",
      renderCell: (params) => (
        <span>{params.row?.AssetTypeId?.lookup_value || "N/A"}</span>
      ),
    },
    {
      field: "AssetName",
      headerName: "Asset Name",
      width: 150,
      headerClassName: "blue-header",
      renderCell: (params) => <span>{params.row?.AssetName || "N/A"}</span>,
    },
    {
      field: "Gender",
      headerName: "Gender",
      width: 120,
      headerClassName: "blue-header",
      renderCell: (params) => <span>{params.row?.Gender || "N/A"}</span>,
    },
    {
      field: "dob",
      headerName: "Date of Birth",
      width: 150,
      headerClassName: "blue-header",
      renderCell: (params) => <span>{__formatDate2(params.row?.DOB)}</span>,
    },
    {
      field: "doj",
      headerName: "Date of Joining",
      width: 150,
      headerClassName: "blue-header",
      renderCell: (params) => <span>{__formatDate(params.row?.DateOfJoining)}</span>,
    },
    {
      field: "bloodGroup",
      headerName: "Blood Group",
      width: 140,
      headerClassName: "blue-header",
      renderCell: (params) => <span>{params.row?.BloodGroup || "N/A"}</span>,
    },
    {
      field: "reportingAsset",
      headerName: "Reporting Asset",
      width: 160,
      headerClassName: "blue-header",
      renderCell: (params) => <span>{params.row?.ReportingAssetID || "N/A"}</span>,
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 150,
      headerClassName: "blue-header",
      renderCell: (params) => (
        <span>{params.row?.DesignationTypeId?.lookup_value || "N/A"}</span>
      ),
    },
    {
      field: "department",
      headerName: "Department",
      width: 150,
      headerClassName: "blue-header",
      renderCell: (params) => (
        <span>{params.row?.DepartmentTypeId?.lookup_value || "N/A"}</span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      headerClassName: "blue-header",
      renderCell: (params) => <span>{__formatDate(params.row?.createdAt)}</span>,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 150,
      headerClassName: "blue-header",
      renderCell: (params) => <span>{__formatDate(params.row?.updatedAt)}</span>,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "blue-header",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <div
              className="flex items-center justify-center  cursor-pointer"
              data-bs-toggle="dropdown"
            >
              <MoreVertIcon
                sx={{ color:"gray", cursor: "pointer", display:"flex" , justifyContent: "center" ,alignItems:"center",marginTop:2}}
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
                <div
                  className="font-normal text-base px-2 py-2 cursor-pointer border border-bottom-1"
                  onClick={() => {
                    alert(`Edit button clicked ${params.row?._id}`);
                  }}
                >
                  Edit
                </div>

                {/* Delete Action  */}
                <div
                  className="font-normal text-base px-2 py-2 cursor-pointer"
                  onClick={() => {
                   alert(`Delete button clicked ${params.row?._id}`)
                  }}
                >
                   Delete
                </div>
              </div>
            </div>
          </>
        );
      },
    }
  ];

  // ====================== Vehicle Columns ======================
  const vehicleColumns = [
    {
      field: "parentAssetId",
      headerName: "Parent Asset ID",
      width: 150,
      headerClassName: "blue-header",
      renderCell: (params) => (
        <span>{params.row?.AssetTypeId?.lookup_value || "N/A"}</span>
      ),
    },
    {
      field: "RegistrationNumber",
      headerName: "Registration No.",
      width: 170,
      headerClassName: "blue-header",
      renderCell: (params) => (
        <span>{params.row?.RegistrationNumber || "N/A"}</span>
      ),
    },
    {
      field: "engineNo",
      headerName: "Engine No.",
      width: 170,
      headerClassName: "blue-header",
      renderCell: (params) => <span>{params.row?.EngineNumber || "N/A"}</span>,
    },
    {
      field: "chassisNo",
      headerName: "Chassis No.",
      width: 170,
      headerClassName: "blue-header",
      renderCell: (params) => <span>{params.row?.ChassisNumber || "N/A"}</span>,
    },
    {
      field: "Model",
      headerName: "Model",
      width: 150,
      headerClassName: "blue-header",
      renderCell: (params) => <span>{params.row?.Model || "N/A"}</span>,
    },
    {
      field: "make",
      headerName: "Make",
      width: 150,
      headerClassName: "blue-header",
      renderCell: (params) => <span>{params.row?.Make || "N/A"}</span>,
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      width: 170,
      headerClassName: "blue-header",
      renderCell: (params) => <span>{params.row?.Manufacturer || "N/A"}</span>,
    },
    {
      field: "year",
      headerName: "Year",
      width: 120,
      headerClassName: "blue-header",
      renderCell: (params) => <span>{params.row?.Year || "N/A"}</span>,
    },
    {
      field: "color",
      headerName: "Color",
      width: 120,
      headerClassName: "blue-header",
      renderCell: (params) => <span>{params.row?.Color || "N/A"}</span>,
    },
    {
      field: "fuelType",
      headerName: "Fuel Type",
      width: 150,
      headerClassName: "blue-header",
      renderCell: (params) => (
        <span>{params.row?.FuelTypeId?.lookup_value || "N/A"}</span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      headerClassName: "blue-header",
      renderCell: (params) => {
        return (
          <>
            <div
              className="flex items-center justify-center cursor-pointer"
              data-bs-toggle="dropdown"
            >
              <MoreVertIcon
                sx={{ color:"gray", cursor: "pointer", display:"flex" , justifyContent: "center" ,alignItems:"center",marginTop:2}}
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
        );
      },
    },
  ];


  const [value, setValue] = useState('68b5428a7c888e09e7af1cc3');
  const [selectedName, setSelectedName] = useState("Individual");
  const [loading, setLoading] = useState(false);
  const [assetData, setAssetData] = useState([]);
  const [state, setstate] = useState({
    AssetTypeId: null,
    AssetType: [],
    AssetSection: "Individual", // Set Individual as default
    assetName: "",
    gender: "",
    DOB: "",
    DateOfJoining: "",
    BloodGroup: "",
    ReportingAssetID: null,
    DesignationTypeId: null,
    DepartmentTypeId: null,
    FleetTypeId: null,
    RegistrationNumber: "",
    EngineNumber: "",
    ChassisNumber: "",
    Model: "",
    Make: "",
    Manufacturer: "",
    Year: "",
    Color: "",
    FuelTypeId: null,
    ParentAssetId: null,
    FuelType: [],
    DepartmentType: [],
    parentAssetsType: [],
    IndividualAsset: [],
    VehicleAssets: [],
    designationType: [],
    fleetType: [],
    error: "",
    success: "",
    isLoading: false,

  });

  const {

    AssetSection,
    ParentAssetId,
    AssetTypeId,
    parentAssetsType,
    AssetType,
    assetName,
    gender,
    DOB,
    DateOfJoining,
    BloodGroup,
    ReportingAssetID,
    DesignationTypeId,
    DepartmentTypeId,
    FleetTypeId,
    RegistrationNumber,
    EngineNumber,
    ChassisNumber,
    Model,
    Make,
    Manufacturer,
    Year,
    Color,
    FuelTypeId,
    FuelType,
    DepartmentType,
    IndividualAsset,
    VehicleAssets,
    designationType,
    fleetType,
    error,
    success,
    isLoading,
  } = state;




  const updateState = (data) => setstate((prevState) => ({ ...prevState, ...data }));
  // =================RESET=FORM==========================================
  const resetForm = () => {
    updateState({
      AssetTypeId: "",
      AssetType: [],
      AssetSection: "Individual", // Reset to Individual
      assetName: "",
      gender: "",
      DOB: "",
      DateOfJoining: "",
      BloodGroup: "",
      ReportingAssetID: "",
      DesignationTypeId: "",
      DepartmentTypeId: "",
      FleetTypeId: "",
      RegistrationNumber: "",
      EngineNumber: "",
      ChassisNumber: "",
      Model: "",
      Make: "",
      Manufacturer: "",
      Year: "",
      Color: "",
      FuelTypeId: "",
      error: "",
      success: "",
      IsActive: true,
      IndividualAsset: [],
      VehicleAssets: [],
      designationType: [],
      fleetType: [],
    });
  };
  // ================END=RESET=FORM==========================================

  const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
    updateState({ isLoading: true });
    try {
      const data = await __getCommenApiDataList({
        lookup_type: lookupTypes,
        parent_lookup_id: parent_lookup_id || null,
      });



      if (data && Array.isArray(data) && data.length > 0) {
        updateState({ [stateKey]: data, isLoading: false });
      }
      else if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
        updateState({ [stateKey]: data.data, isLoading: false });
      } else if (data && data.list && Array.isArray(data.list) && data.list.length > 0) {
        updateState({ [stateKey]: data.list, isLoading: false });
      }
      else {
        // console.warn(`No data found for ${stateKey}:`, data);
        updateState({ [stateKey]: [], isLoading: false });
      }
    } catch (error) {
      console.error(`Error fetching ${stateKey}:`, error);
      updateState({ [stateKey]: [], isLoading: false });
    }
  };

  const fetchIndividual = () => {
    updateState({ isLoading: true });
    __postApiData("/api/v1/admin/AssetList", {
      page: 1,
      limit: 20,
      // "search": ""
      AssetTypeId,
      //"ParentAssetId": "",
    })
      .then((res) => {
        updateState({ isLoading: false });
        if (res.response && res.response.response_code === "200") {
          if (AssetSection === "Individual") {
            updateState({
              IndividualAsset: res?.data?.list || [],
              isLoading: false,
            });
          } else {
            updateState({
              VehicleAssets: res?.data?.list || [],
              isLoading: false,
            });
          }
        } else {
          const errorMsg =
            res.response?.message || res.message || "Failed to fetch stations";
          updateState({ error: errorMsg, isLoading: false });
          toast.error(errorMsg);
        }
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
        const errorMsg =
          error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching stations";
        updateState({ error: errorMsg, isLoading: false });
        toast.error(errorMsg);
      });

  };

  const fetchIndividualTabData = () => {
    setLoading(true);
    __postApiData("/api/v1/admin/AssetList", {
      page: 1,
      limit: 20,
      // "search": ""
      AssetTypeId: value ? value : "68b5428a7c888e09e7af1cc3",
      //"ParentAssetId": "",
    })
      .then((res) => {
        setLoading(false);
        if (res.response && res.response.response_code === "200") {
          setAssetData(res.data.list)
          setLoading(false);
        } else {
          const errorMsg =
            res.response?.message || res.message || "Failed to fetch stations";
          updateState({ error: errorMsg });
          toast.error(errorMsg);
        }
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
        const errorMsg =
          error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching stations";
        updateState({ error: errorMsg });
        setLoading(false);
        toast.error(errorMsg);
      });

  };
  useEffect(() => {
    fetchData(["fuel_type"], "FuelType");
    fetchData(["asset_type"], "AssetType");
    fetchData(["department_type"], "DepartmentType");
    fetchData(["designation_type"], "designationType");
    fetchData(["fleet_type"], "fleetType");

  }, []);
  useEffect(() => {
    fetchIndividual();
  }, [AssetTypeId]);
  // =================handle  to show list on filter Asset========================= 
  useEffect(() => {
    if (value) {
      fetchIndividualTabData();
    }
  }, [value]);

  const __handleSave = (e) => {
    e.preventDefault();

    if (AssetSection === "Individual") {
      handleIndividualAPI();
    } else if (AssetSection === "Vehicle") {
      handleVehicleAPI();
    }
  };

  const handleIndividualAPI = () => {
    const payload = {
      ...(AssetTypeId ? { AssetTypeId } : { AssetTypeId: null }),
      ParentAssetId: ParentAssetId || null,
      AssetName: assetName,
      Gender: gender,
      DOB: DOB,
      DateOfJoining: DateOfJoining,
      BloodGroup: BloodGroup,
      ReportingAssetID: ReportingAssetID || null,
      DesignationTypeId: DesignationTypeId || null,
      DepartmentTypeId: DepartmentTypeId || null
    };
    updateState({ isLoading: true });
    __postApiData('/api/v1/admin/SaveIndividualAsset', payload)
      .then((res) => {
        // console.log(res, "SaveIndividualAsset")
        if (res.response && res.response.response_code === "200") {
          toast.success("Individual Asset saved successfully!");
          updateState({
            success: "Individual Asset saved successfully!",
            isLoading: false
          });
          fetchData(["asset_type"], "AssetType");
          fetchIndividualTabData();
          resetForm();
        } else {
          const errorMsg = res.response?.message || res.message || "Failed to save individual asset";
          console.error("API Error Response:", res);
          updateState({
            error: errorMsg,
            isLoading: false
          });
          toast.error(errorMsg);
        }
      })
      .catch((error) => {
        console.error("Error saving individual asset:", error);
        const errorMsg = error.response?.data?.message || error.message || "An error occurred while saving the individual asset";
        updateState({
          error: errorMsg,
          isLoading: false
        });
        toast.error(errorMsg);
      });
  };
  // =================handle=Vehicle=API=fn=========================
  const handleVehicleAPI = () => {
    const payload = {
      ...(AssetTypeId ? { AssetTypeId } : { AssetTypeId: null }),
      ParentAssetId: ParentAssetId || null,
      FleetTypeId: FleetTypeId,
      RegistrationNumber: RegistrationNumber,
      EngineNumber: EngineNumber,
      ChassisNumber: ChassisNumber,
      Model: Model,
      Make: Make,
      Manufacturer: Manufacturer,
      Year: Year,
      Color: Color,
      FuelTypeId: FuelTypeId
    };
    __postApiData('/api/v1/admin/SaveVehicleAsset', payload)
      .then((res) => {
        console.log(res, "SaveVehicleAsset");
        if (res.response && res.response.response_code === "200") {
          toast.success("Vehicle Asset saved successfully!");
          updateState({
            success: "Vehicle Asset saved successfully!",
            isLoading: false
          });
          fetchData(["asset_type"], "AssetType");
          fetchIndividualTabData();
          resetForm();
        } else {
          const errorMsg = res.response?.message || res.message || "Failed to save vehicle asset";
          console.error("API Error Response:", res);
          updateState({
            error: errorMsg,
            isLoading: false
          });
          toast.error(errorMsg);
        }
      })
      .catch((error) => {
        console.error("Error saving vehicle asset:", error);
        const errorMsg = error.response?.data?.message || error.message || "An error occurred while saving the vehicle asset";
        updateState({
          error: errorMsg,
          isLoading: false
        });
        toast.error(errorMsg);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTabChange = (tab) => {
    updateState({ AssetSection: tab });
  };

  const handleCatTabChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === "all") {
      setSelectedName("All");
    } else {
      const selectedObj = AssetType.find((el) => el._id === newValue);
      setSelectedName(selectedObj?.name || "");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Assets Master</h1>
      <div className="flex justify-between items-center">

        <div className="grid grid-cols-6 lg:grid-cols-12 gap-6 w-full mx-auto">
          <div className="bg-white py-3 px-3 rounded-xl border col-span-12 lg:col-span-5">
            <form
              onSubmit={__handleSave}
              className="bg-white  rounded-2xl p-2 w-full max-w-2xl space-y-4"
            >
              {/* Asset Type Selection */}
              <FormControl fullWidth>
                <InputLabel id="assets-section-id">Asset Type</InputLabel>
                <Select
                  MenuProps={{
                    disablePortal: true,
                    disableScrollLock: true,
                  }}
                  labelId="assets-section-id"
                  name="AssetSection"
                  value={state.AssetTypeId || ""}   // keep only the id in state
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const selectedObj = AssetType.find((el) => el._id === selectedId);

                    setstate((prev) => ({
                      ...prev,
                      AssetSection: selectedObj?.lookup_value,
                      AssetTypeId: selectedId
                    }));
                  }}
                  label="Asset Type*"
                >
                  {AssetType?.map((el) => (
                    <MenuItem key={el._id} value={el._id}>
                      {el.name || ""}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="assets-master-label">Parent Assets</InputLabel>
                <Select
                  MenuProps={{
                    disablePortal: true,
                    disableScrollLock: true,
                  }}
                  labelId="assets-master-label"
                  name="ParentAssetId"
                  value={ParentAssetId}
                  onChange={handleChange}
                  label="Parent Asset"
                >
                  <MenuItem value="">
                    <em>Select Parent Assets id</em>
                  </MenuItem>
                  {AssetSection === "Individual" ? IndividualAsset?.map((el) => (
                    <MenuItem
                      key={el._id} value={el._id}
                    >
                      <span className="text"></span>  {el?.AssetName || ""}
                    </MenuItem>
                  )) : VehicleAssets?.map((el) => (
                    <MenuItem
                      key={el._id} value={el._id}
                    >
                      <span className="text"></span>  {el.Model || ""}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* <FormControl fullWidth>
                <InputLabel id="assets-type-id">Asset ID</InputLabel>
                <Select
                  MenuProps={{
                    disablePortal: true,
                    disableScrollLock: true,
                  }}
                  labelId="assets-type-id"
                  name="AssetTypeId"
                  value={AssetTypeId}
                  onChange={handleChange}
                  label="Asset Type*"
                >
                  {AssetType?.map((el) => (
                    <MenuItem key={el.id} value={el.id}>
                      {el?.lookup_value || 'No Name'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}



              {/* ====================== INDIVIDUAL FIELDS ====================== */}
              {AssetSection === "Individual" && (
                <>
                  <TextField
                    label="Asset Name"
                    name="assetName"
                    value={assetName}
                    onChange={handleChange}
                    fullWidth
                  />
                  <FormControl fullWidth>
                    <InputLabel id="input-gen">Gender</InputLabel>
                    <Select
                      labelId="input-gen"
                      name="gender"
                      label="Gender"
                      value={gender}
                      onChange={handleChange}
                      MenuProps={{
                        disablePortal: true,
                        disableScrollLock: true,
                      }}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    type="date"
                    label="Date of Birth"
                    name="DOB"
                    value={DOB}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    type="date"
                    label="Date of Joining"
                    name="DateOfJoining"
                    value={DateOfJoining}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />

                  <FormControl fullWidth>
                    <InputLabel>Blood Group</InputLabel>
                    <Select
                      name="BloodGroup"
                      label="Blood Group"
                      value={BloodGroup}
                      onChange={handleChange}
                      MenuProps={{
                        disablePortal: true,
                        disableScrollLock: true,
                      }}
                    >
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                        (bg) => (
                          <MenuItem key={bg} value={bg}>
                            {bg}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Reporting Asset</InputLabel>
                    <Select
                      name="ReportingAssetID"
                      label="Reporting Asset"
                      value={ReportingAssetID}
                      onChange={handleChange}
                      MenuProps={{
                        disablePortal: true,
                        disableScrollLock: true,
                      }}
                    >
                      <MenuItem value={null}>Asset A</MenuItem>
                      <MenuItem value={null}>Asset B</MenuItem>

                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Designation</InputLabel>
                    <Select
                      name="DesignationTypeId"
                      label="Designation"
                      value={DesignationTypeId}
                      onChange={handleChange}
                      MenuProps={{
                        disablePortal: true,
                        disableScrollLock: true,
                      }}
                    >
                      {designationType?.map((el) => (
                        <MenuItem key={el?._id} value={el?._id}>
                          {el?.name || 'No Name'}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Department</InputLabel>
                    <Select
                      MenuProps={{
                        disablePortal: true,
                        disableScrollLock: true,
                      }}
                      label="Department"
                      name="DepartmentTypeId"
                      value={DepartmentTypeId}
                      onChange={handleChange}
                    >{DepartmentType?.map((el) => (
                      <MenuItem key={el.id} value={el.id}>
                        {el?.lookup_value || 'No Name'}
                      </MenuItem>
                    ))}
                    </Select>
                  </FormControl>
                </>
              )}

              {/* ====================== VEHICLE FIELDS ====================== */}
              {AssetSection === "Vehicle" && (
                <>
                  <FormControl fullWidth>
                    <InputLabel>Fleet Type</InputLabel>
                    <Select
                      name="FleetTypeId"
                      value={FleetTypeId}
                      onChange={handleChange}
                      label="Fleet Type"
                      MenuProps={{
                        disablePortal: true,
                        disableScrollLock: true,
                      }}
                    >

                      {fleetType?.map((el) => (
                        <MenuItem key={el._id} value={el._id}>
                          {el?.lookup_value || 'No Name'}
                        </MenuItem>
                      ))}

                    </Select>
                  </FormControl>

                  <TextField
                    label="Registration Number"
                    name="RegistrationNumber"
                    value={RegistrationNumber}
                    onChange={handleChange}
                    fullWidth
                  />

                  <TextField
                    label="Engine Number"
                    name="EngineNumber"
                    value={EngineNumber}
                    onChange={handleChange}
                    fullWidth
                  />

                  <TextField
                    label="Chassis Number"
                    name="ChassisNumber"
                    value={ChassisNumber}
                    onChange={handleChange}
                    fullWidth
                  />

                  <TextField
                    label="Model"
                    name="Model"
                    value={Model}
                    onChange={handleChange}
                    fullWidth
                  />

                  <TextField
                    label="Make"
                    name="Make"
                    value={Make}
                    onChange={handleChange}
                    fullWidth
                  />

                  <TextField
                    label="Manufacturer"
                    name="Manufacturer"
                    value={Manufacturer}
                    onChange={handleChange}
                    fullWidth
                  />

                  <TextField
                    label="Year"
                    type="number"
                    name="Year"
                    value={Year}
                    onChange={handleChange}
                    fullWidth
                  />

                  <TextField
                    label="Color"
                    name="Color"
                    value={Color}
                    onChange={handleChange}
                    fullWidth
                  />

                  <FormControl fullWidth>
                    <InputLabel>Fuel Type</InputLabel>
                    <Select
                      name="FuelTypeId"
                      value={FuelTypeId}
                      onChange={handleChange}
                      label="Fuel Type"
                      MenuProps={{
                        disablePortal: true,
                        disableScrollLock: true,
                      }}
                    >
                      {FuelType?.map((el) => (
                        <MenuItem key={el.id} value={el.id}>
                          {el?.lookup_value || 'No Name'}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}

              {/* Submit */}
              <Button
               disabled={isLoading}
                type="submit"
                variant="contained"
                color="primary"
                className="w-full"
              >
                Submit
              </Button>
            </form>
          </div>

          <div className="bg-white pb-2 rounded-lg  col-span-12 lg:col-span-7">
            <Box sx={{ width: '100%', typography: 'body1', mb: 2 }}>
              <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                <Tabs onChange={handleCatTabChange} aria-label="selectedTab" value={value}>
                  {/* <Tab label="All" value="all" /> */}
                  {AssetType?.map((el) => (
                    <Tab key={el._id} label={el.name || ""} value={el._id} sx={{fontSize: 16,fontWeight: 'bold'}} />
                  ))}
                </Tabs>
              </Box>
            </Box>

            <DataGrid
              rows={assetData}
              loading={loading}
              columns={selectedName === "Individual" ? individualColumns : vehicleColumns}
              pageSize={10}
              autoHeight
              pagination
              getRowId={(row) => row._id}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },
              }}
              pageSizeOptions={[10]}
            />


          </div>


        </div>
      </div>

    </div>
  );
}


