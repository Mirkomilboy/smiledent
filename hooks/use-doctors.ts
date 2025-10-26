"use client"

import { createDoctor, getAvailableDoctors, getDoctors, updateDoctor } from "@/lib/actions/doctors"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useGetDoctors() {
  return useQuery({
    queryKey: ["getDoctors"],
    queryFn: getDoctors
  });
}

export function useCreateDoctor() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      // invalidate related queries to refresh the data
      queryClient.invalidateQueries({queryKey: ["getDoctors"]})
    },
    onError: (error) => console.log("Error while creating a doctor", error)
  });
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateDoctor,
    onSuccess: () => {
      // invalidate related queries to refresh the data
      queryClient.invalidateQueries({queryKey: ["getDoctors"]});
      queryClient.invalidateQueries({queryKey: ["getAvailableDoctors"]});
    },
    onError: (error) => console.log("Error while creating a doctor", error)
  });
}

export function useAvailableDoctors() {
  return useQuery({
    queryKey: ["getAvailableDoctors"],
    queryFn: getAvailableDoctors,
  });
}