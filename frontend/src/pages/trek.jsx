import axios from "axios"
import config from "../config"
import { toast } from "react-toastify"
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect } from "react"
import { useState } from "react"
import { tr } from "zod/v4/locales"

const Trek = () => {
    const [allTrek, setAllTrek] = useState([])
    const [removeId, setRemoveId] = useState(null)
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

    const handleFormSubmit = async trekData => {
        await addTrek(trekData)
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
            setAllTrek(data.result)
        } catch (error) {
            console.log(error)
        }
    }

    const addTrek = async trekData => {
        try {
            const { data } = await api.post("/create-trek", trekData)
            toast.success("trek create success")
            fetchTreks()
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
            const { data } = await api.delete(`/delete-trek/${removeId}`)
            toast.success("trek delete success")
            fetchTreks()
        } catch (error) {
            console.log(error)
            toast.error("unable to delete trek")
        }
    }
    useEffect(() => {
        fetchTreks()
    }, [])
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
                                <button type="submit" form="trekForm" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <table class="table table-dark table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">name</th>
                    <th scope="col">location</th>
                    <th scope="col">difficulty</th>
                    <th scope="col">duration</th>
                    <th scope="col">availableSlots</th>
                    <th scope="col">status</th>
                    <th scope="col">startDate</th>
                    <th scope="col">endDate</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    allTrek.map(item => <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.location}</td>
                        <td>{item.difficulty}</td>
                        <td>{item.duration}</td>
                        <td>{item.availableslots}</td>
                        <td>{item.status}</td>
                        <td>{item.startdate}</td>
                        <td>{item.enddate}</td>
                        <td>
                            <button type="button" class="btn btn-warning">Edit</button>
                            <button onClick={() => setRemoveId(item.id)} data-bs-toggle="modal" data-bs-target="#deleteModal" type="button" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>


        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Delete Trek</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Are you sure you want to delete this trek?</h6>
                        <button onClick={removeTrek} type="button" data-bs-dismiss="modal" class="btn btn-outline-danger">Yes</button>
                        <button type="button" data-bs-dismiss="modal" class="btn btn-success">No</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
}

export default Trek
