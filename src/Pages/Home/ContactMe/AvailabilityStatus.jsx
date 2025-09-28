import React from 'react'

const AvailabilityStatus = () => {
  return (
    <div 
      className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-6"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div 
        className="flex items-center gap-3 mb-2"
        data-aos="fade-right"
        data-aos-duration="600"
        data-aos-delay="100"
      >
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-green-400 font-semibold">Available for Work</span>
      </div>
      <p 
        className="text-gray-300 text-sm"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="200"
      >
        Currently open to internships, freelance projects, and full-time opportunities.
      </p>
    </div>
  )
}

export default AvailabilityStatus