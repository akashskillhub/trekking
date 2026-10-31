import axios from "axios"
import config from "../config"
import { toast } from "react-toastify"
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const Trek = () => {
    const api = axios.create({ baseURL: `${config.BACKEND_URL}/api/admin`, withCredentials: "includes" })

    const schema = z.object({
        name: z.string().min(3, 'Minimum 3 characters'),
        location: z.string().min(3, 'Minimum 3 characters'),
        difficulty: z.enum(['easy', 'moderate', 'hard'], { error: 'Select difficulty' }),
        duration: z.string().min(1, 'Duration is required'),
        availableSlots: z.string().min(1, 'Available slots is required'),
        status: z.string().min(1, 'Status is required'),
        startDate: z.string().min(1, 'Start date is required'),
        endDate: z.string().min(1, 'End date is required'),
    }).refine(data => data.endDate >= data.startDate, {
        message: 'End date must be after start date',
        path: ['endDate'],
    })

    const { handleSubmit, register, reset, formState: { errors, touchedFields } } = useForm({
        resolver: zodResolver(schema)
    })

    const handleFormSubmit = trekData => {
        console.log(trekData)
        reset()
    }

    const handleClasses = (key) => clsx({
        'form-control mb-2': true,
        'is-invalid': errors[key],
        'is-valid': touchedFields[key] && !errors[key],
    })

    const fetchTreks = async () => {
        try {

            const { data } = await api.get("/trek")
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const addTrek = async trekData => {
        try {
            const { data } = await api.post("/create-trek", trekData)
            toast.success("trek create success")
        } catch (error) {
            console.log(error)
            toast.error("unable to create trek")
        }
    }

    const modifyTrek = async trekData => {
        try {
            const { data } = await api.put("/update-trek/1", trekData)
            toast.success("trek update success")
        } catch (error) {
            console.log(error)
            toast.error("unable to update trek")
        }
    }

    const removeTrek = async trekData => {
        try {
            const { data } = await api.delete("/delete-trek/1")
            toast.success("trek delete success")
        } catch (error) {
            console.log(error)
            toast.error("unable to delete trek")
        }
    }
    return <div className="container">
        <div>
            <div className="text-end mt-3">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add Trek
                </button>


                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="trekForm" onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <input {...register('name')} className={handleClasses('name')} type="text" placeholder="enter name" />
                                            <div className="invalid-feedback">{errors.name?.message}</div>
                                        </div>
                                        <div className="col-sm-6">
                                            <input {...register('location')} className={handleClasses('location')} type="text" placeholder="enter location" />
                                            <div className="invalid-feedback">{errors.location?.message}</div>
                                        </div>
                                        <div className="col-sm-6">
                                            <select {...register('difficulty')} className={handleClasses('difficulty')}>
                                                <option value="">Choose Difficulty</option>
                                                <option value="easy">Easy </option>
                                                <option value="moderate">Moderate</option>
                                                <option value="hard">Hard</option>
                                            </select>
                                            <div className="invalid-feedback">{errors.difficulty?.message}</div>
                                        </div>
                                        <div className="col-sm-6">
                                            <input {...register('duration')} className={handleClasses('duration')} type="text" placeholder="enter duration" />
                                            <div className="invalid-feedback">{errors.duration?.message}</div>
                                        </div>
                                        <div className="col-sm-6">
                                            <input {...register('availableSlots')} className={handleClasses('availableSlots')} type="text" placeholder="enter availableslots" />
                                            <div className="invalid-feedback">{errors.availableSlots?.message}</div>
                                        </div>
                                        <div className="col-sm-6">
                                            <input {...register('status')} className={handleClasses('status')} type="text" placeholder="enter status" />
                                            <div className="invalid-feedback">{errors.status?.message}</div>
                                        </div>
                                        <div className="col-sm-6">
                                            <input {...register('startDate')} className={handleClasses('startDate')} type="date" placeholder="enter startdate" />
                                            <div className="invalid-feedback">{errors.startDate?.message}</div>
                                        </div>
                                        <div className="col-sm-6">
                                            <input {...register('endDate')} className={handleClasses('endDate')} type="date" placeholder="enter enddate" />
                                            <div className="invalid-feedback">{errors.endDate?.message}</div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" form="trekForm" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Trek
