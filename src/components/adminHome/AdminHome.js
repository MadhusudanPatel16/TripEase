import { Link } from "react-router-dom";
import "./AdminHome.css";
import { FaBus, FaHotel, FaMapMarkerAlt, FaPlane, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function AdminHome() {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>TripEase Admin Dashboard</h1>
      </header>

      <div className="admin-grid">
        <Section icon={<FaPlane />} title="Trips" links={[
          { text: "Create Trip", to: "/trip/create", icon: <FaPlus /> },
          { text: "Update Trip", to: "/trip/update", icon: <FaEdit /> },
          { text: "Delete Trip", to: "/trip/delete", icon: <FaTrash /> },
        ]} />

        <Section icon={<FaMapMarkerAlt />} title="Pickup Points" links={[
          { text: "Create Pickup", to: "/pickupPoint/create", icon: <FaPlus /> },
          { text: "Update Pickup", to: "/pickup/update", icon: <FaEdit /> },
          { text: "Delete Pickup", to: "/pickup/delete", icon: <FaTrash /> },
        ]} />

        <Section icon={<FaBus />} title="Buses" links={[
          { text: "Create Bus", to: "/create/bus", icon: <FaPlus /> },
          { text: "Update Bus", to: "/bus/update", icon: <FaEdit /> },
          { text: "Delete Bus", to: "/bus/delete", icon: <FaTrash /> },
        ]} />

        <Section icon={<FaHotel />} title="Hotels" links={[
          { text: "Create Hotel", to: "/create/hotel", icon: <FaPlus /> },
          { text: "Update Hotel", to: "/hotel/update", icon: <FaEdit /> },
          { text: "Delete Hotel", to: "/hotel/delete", icon: <FaTrash /> },
        ]} />
      </div>
    </div>
  );
}

function Section({ title, links, icon }) {
  return (
    <div className="admin-card">
      <div className="icon">{icon}</div>
      <h2>{title}</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.to} className="admin-link">
              {link.icon} <span>{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
