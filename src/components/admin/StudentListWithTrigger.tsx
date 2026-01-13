'use client'

import React from 'react'
import { Loading, CourseSelect, StudentList } from '@/components'
import { Course, courses } from '@/constants/courses'

const StudentListWithTrigger = () => {
	const [course, setCourse] = React.useState<Course>(courses[0])

	return (
		<>
			<CourseSelect value={course} setValue={setCourse} />
			<React.Suspense
				fallback={
					<div className="flex justify-center items-center w-full h-full">
						<Loading />
					</div>
				}
			>
				<StudentList currentCourse={course} />
			</React.Suspense>
		</>
	)
}

export default StudentListWithTrigger
