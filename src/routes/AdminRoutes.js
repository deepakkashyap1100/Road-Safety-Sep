import { Route, Routes } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import AssetMasterForm from "../pages/AssetMaster/AssetMaster";
import StationMaster from "../pages/StationMaster/StationMaster";
import AccidentOutlet from "../pages/AccidentMaster/AccidentOutlet";
import AccidentMasterList from "../pages/AccidentMaster/AccidentMasterList";
import CauseofAccident from "../pages/AccidentMaster/CauseofAccident";
import AccidentTypeMaster from "../pages/AccidentMaster/AccidentTypeMaster";

const AdminRoutes = () => (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="station-master" element={<StationMaster />} />
            <Route path="asset-master" element={<AssetMasterForm />} />

            {/* Accident Master parent route */}
            <Route path="accident-master/" element={<AccidentOutlet />}>
                <Route path="accident-type" element={<AccidentTypeMaster />} />
                <Route path="CauseofAccident" element={<CauseofAccident />} />
                <Route path="list" element={<AccidentMasterList />} />
            </Route>

        </Route>
    </Routes>
);

export default AdminRoutes;
