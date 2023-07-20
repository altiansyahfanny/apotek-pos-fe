import { apiSlice } from './apiSlice';

export const prescriptionApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPrescriptions: builder.query({
			query: () => `prescription`,
			providesTags: ['Prescription'],
		}),
		getPrescriptionsWithPagination: builder.query({
			query: ({ per_page, current_page, key_search }) =>
				`prescription/pagination?current_page=${current_page}&per_page=${per_page}&key_search=${key_search}`,

			providesTags: ['Prescription'],
		}),
		getPrescriptionById: builder.query({
			query: (id) => `prescription/${id}`,
			transformResponse: ({ data }) => {
				return data;
			},
			providesTags: ['Prescription'],
		}),
		createPrescription: builder.mutation({
			query: (data) => ({
				url: 'prescription',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Prescription'],
		}),
		updatePrescription: builder.mutation({
			query: (data) => ({
				url: 'prescription',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Prescription'],
		}),
		deletePrescription: builder.mutation({
			query: (id) => ({
				url: `prescription/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Prescription'],
		}),
	}),
});

export const {
	useCreatePrescriptionMutation,
	useGetPrescriptionsQuery,
	useGetPrescriptionByIdQuery,
	useGetPrescriptionsWithPaginationQuery,
	useDeletePrescriptionMutation,
	useUpdatePrescriptionMutation,
} = prescriptionApi;
