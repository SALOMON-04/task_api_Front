import axios from "axios";

const TaskApi = axios.create({
	withCredentials: true, // envoie le cookie de session
});

export default TaskApi;