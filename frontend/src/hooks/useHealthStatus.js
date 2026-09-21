import { useQuery } from "@tanstack/react-query";
import { getHealthStatus } from "../services/healthService.js";

export function useHealthStatus() {
    return useQuery({
        queryKey: ['health-status'],
        queryFn: getHealthStatus,
    });
}