import React, { useState, useEffect } from "react";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import "./Subject.css";

export default function Subject({ show, day, time, value, onClose, onSave }) {
	const [subject, setSubject] = useState("");
	const [type, setType] = useState("");


	useEffect(() => {
		setSubject(value?.subject || "");
		setType(value?.type || "");
	}, [value, day, time]);

	if (!show) return null;

	const handleSave = () => {
		if (subject.trim() && type.trim()) {
			register({ day, time, subject, type });
			onSave({ subject, type });

		}
	};

	function register() {
		const user = {
			subject: subject,
			type: type,
			day: day,
			time: time
		}
		fetch("http://localhost:8080/table/register",
			{
				headers: {
					"content-Type": "application/json"
				},

				method: "POST",
				body: JSON.stringify(user)
			})
			.then(res => res.text())
			.then(data => {
				alert(data)
			}
			)
			.catch(err => console.log(err))

	}

	return (
		<div className="section pb-5 pt-5 pt-sm-2 text-center">
			<div className="card-3d-wrap mx-auto">
				<div className="card-3d-wrapper">
					<div className="card-front">
						<div className="center-wrap">
							<div className="section text-center">
								<h4 className="mb-4 pb-3">Subject Details</h4>
								<h5 className="mb-4 pb-3">
									{day} at {time}
								</h5>

								<div className="form-group">
									<input
										type="text"
										name="subjectCode"
										className="form-style"
										placeholder="Subject Code"
									/>
									<i className="input-icon uil uil-code"></i>
								</div>

								<div className="form-group mt-2">
									<input
										type="text"
										name="subject"
										className="form-style"
										value={subject}
										onChange={(e) => setSubject(e.target.value)}
										placeholder="Subject"
									/>
									<i className="input-icon uil uil-book"></i>
								</div>

								<div className="form-group mt-2">
									<select
										className="form-style"
										value={type}
										onChange={(e) => setType(e.target.value)}
									>
										<option value="" disabled>
											Select Type
										</option>
										<option value="Theory">Theory</option>
										<option value="Lab">Lab</option>
									</select>
									<i className="input-icon uil uil-list"></i>
								</div>

								<div className="btn-group mt-4 col-12">
									<button className="btn btn-secondary me-2" onClick={onClose}>
										Cancel
									</button>
									<button className="btn btn-secondary me-2" onClick={handleSave}>
										Save
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
