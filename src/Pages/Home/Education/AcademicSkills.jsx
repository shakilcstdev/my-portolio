import React from 'react'

const AcademicSkills = () => {
  const skills = [
    "Problem Solving",
    "Critical Thinking",
    "Team Collaboration",
    "Project Management",
    "Technical Documentation",
    "Research & Analysis"
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
          Academic <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">Skills</span>
        </h3>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
          Skills developed through my academic journey
        </p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 hover:scale-[1.02] transition-transform duration-300 mx-2 sm:mx-0">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {skills.map((skill, index) => (
            <span
              key={skill}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 rounded-full text-xs sm:text-sm font-medium hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-400 hover:scale-110 transition-all duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AcademicSkills