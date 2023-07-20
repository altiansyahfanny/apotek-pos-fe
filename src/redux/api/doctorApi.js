import { apiSlice } from './apiSlice';

export const doctorApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDoctors: builder.query({
			query: () => `doctor`,
			transformResponse: ({ data }) => {
				return data;
			},
			providesTags: ['Doctor'],
		}),
		getDoctorsWithPagination: builder.query({
			query: ({ per_page, current_page, key_search }) =>
				`doctor/pagination?current_page=${current_page}&per_page=${per_page}&key_search=${key_search}`,
			providesTags: ['Doctor'],
		}),
		createDoctor: builder.mutation({
			query: (data) => ({
				url: 'doctor',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Doctor'],
		}),
		updateDoctor: builder.mutation({
			query: (data) => ({
				url: 'doctor',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['Doctor'],
		}),
	}),
});

export const {
	useCreateDoctorMutation,
	useGetDoctorsQuery,
	useGetDoctorsWithPaginationQuery,
	useUpdateDoctorMutation,
} = doctorApi;
