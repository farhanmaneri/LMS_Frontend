import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/api/authSlice";
import {
  useGetStudentsResultsQuery,
  useGetMyResultQuery,
} from "../redux/api/apiSlice";
import ResultList from "../components/ResultList";

export default function ResultsPage() {
  const user = useSelector(selectCurrentUser);
  const isStudent = user?.role === "student";

  // Admin/Teacher → fetch all results
  const allResults = useGetStudentsResultsQuery(undefined, {
    skip: isStudent,
  });

  // Student → fetch only their own results
  const studentResults = useGetMyResultQuery(undefined, {
    skip: !isStudent,
  });

  const {
    data: results,
    isLoading,
    isError,
    error,
  } = isStudent ? studentResults : allResults;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.data?.message || error?.error}</p>;

  return <ResultList results={results || []} />;
}
