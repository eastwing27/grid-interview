import { MatrixService } from "../services/matrix.service";

export const apiUrl = process.env.REACT_APP_API_URL;
export const matrixServise = new MatrixService(`${apiUrl}/matrix`);