import { useState } from "react"
import { useSelector } from "react-redux";

const testing = () => {
    const userId = useSelector((state) => state.booking.userId);
    const [user, setuser] = useState(null);
    const [loading, setLoading]=useState(true);
    
}