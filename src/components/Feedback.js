import { Button } from 'react-bootstrap';
import { ServoiceFeedback } from 'react-feedback-widget';
import { useAuth } from "../contexts/AuthContext";


function App({ children, ...props }) {
    const { currentUser } = useAuth()
    const config = {
        servId: 'cl7re0n7q000709l44dnfmz57',
        servPID: 'cl7re0n7q000809l4bd6xgjhm',
        userEmail: currentUser?.email ?? "Anonymous",
        userName: currentUser?.displayName ?? "Anonymous",
        userId: currentUser?.uid ?? "Anonymous",
    };
    return (
        <ServoiceFeedback config={config} {...props}>
            {children ?? <Button variant="outline-success" className="">Feedback</Button>}
        </ServoiceFeedback>
    );
}

export default App;