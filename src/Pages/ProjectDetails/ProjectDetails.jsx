import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaStar, FaCalendar, FaLaptop, FaServer, FaCode, FaEye, FaVideo, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { MdEdit, MdDelete } from 'react-icons/md'
import { projectsAPI } from '../../utils/api'
import useAuth from '../../Hooks/useAuth'
import ComponentLoading from '../../Shared/LoadingAnimation/ComponentLoading'

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Image slider state
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const isAdmin = user?.email === 'shakilahamed.s2000@gmail.com'

  useEffect(() => {
    fetchProject()
  }, [id])

  // Auto-slide effect for multiple images
  useEffect(() => {
    if (project?.images && project.images.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change image every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [project?.images, isPaused]);

  // Navigation functions for image slider
  const nextImage = () => {
    if (project?.images && project.images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const prevImage = () => {
    if (project?.images && project.images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
      );
    }
  };
  
  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const fetchProject = async () => {
    try {
      setLoading(true)
      const response = await projectsAPI.getAll()
      if (response.success) {
        const foundProject = response.data.find(p => p._id === id)
        if (foundProject) {
          setProject(foundProject)
          setError(null)
        } else {
          setError('Project not found')
        }
      } else {
        setError('Failed to fetch project')
      }
    } catch (err) {
      setError('Error fetching project')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    navigate(`/dashboard/add-project?edit=${id}`)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        const response = await projectsAPI.delete(id)
        if (response.success) {
          navigate('/projects')
        }
      } catch (err) {
        console.error('Error deleting project:', err)
        alert('Error deleting project. Please try again.')
      }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return <ComponentLoading message="Loading project details..." />
  }

  if (error || !project) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-2xl mb-6">{error || 'Project not found'}</div>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/projects')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaArrowLeft />
              Back to Projects
            </button>
            
            {isAdmin && (
              <div className="flex gap-3">
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors hover:scale-105 active:scale-95"
                >
                  <MdEdit />
                  Edit Project
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors hover:scale-105 active:scale-95"
                >
                  <MdDelete />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {project.title}
                {project.isFeatured && (
                  <span className="ml-4 inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-lg">
                    <FaStar className="text-sm" />
                    Featured
                  </span>
                )}
              </h1>
              
              <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <FaCalendar />
                  Created: {formatDate(project.createdAt)}
                </div>
                {project.updatedAt !== project.createdAt && (
                  <div className="flex items-center gap-2">
                    <FaCalendar />
                    Updated: {formatDate(project.updatedAt)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <FaExternalLinkAlt />
                View Live Demo
              </a>
            )}
            
            {project.liveVideoUrl && (
              <a
                href={project.liveVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <FaVideo />
                Watch Demo Video
              </a>
            )}
            
            {project.clientSourceCode && (
              <a
                href={project.clientSourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <FaLaptop />
                Client Code
              </a>
            )}
            
            {project.serverSourceCode && (
              <a
                href={project.serverSourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <FaServer />
                Server Code
              </a>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Images Gallery with Slider */}
            {project.images && project.images.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Project Gallery</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{currentImageIndex + 1} of {project.images.length}</span>
                  </div>
                </div>
                
                {/* Main Image Slider */}
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl group"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {/* Image Container */}
                  <div className="relative h-96 sm:h-[500px] lg:h-[600px]">
                    {project.images.map((imageUrl, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ease-out ${
                          index === currentImageIndex 
                            ? 'opacity-100 scale-100' 
                            : 'opacity-0 scale-110'
                        }`}
                      >
                        <img
                          src={imageUrl}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                  </div>
                  
                  {/* Navigation Controls */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur-sm text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:scale-110 transition-all duration-300 z-10"
                        title="Previous Image"
                      >
                        <FaChevronLeft className="text-lg" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur-sm text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:scale-110 transition-all duration-300 z-10"
                        title="Next Image"
                      >
                        <FaChevronRight className="text-lg" />
                      </button>
                    </>
                  )}
                  
                  {/* Image Counter Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                    {currentImageIndex + 1} / {project.images.length}
                  </div>
                  
                  {/* Auto-play Indicator */}
                  {project.images.length > 1 && !isPaused && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs backdrop-blur-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Auto-play
                    </div>
                  )}
                </div>
                
                {/* Thumbnail Navigation */}
                {project.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {project.images.map((imageUrl, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                          currentImageIndex === index 
                            ? 'ring-3 ring-blue-500 scale-105 shadow-lg shadow-blue-500/50' 
                            : 'ring-2 ring-slate-600 hover:ring-slate-400 hover:scale-105'
                        }`}
                      >
                        <img
                          src={imageUrl}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Image Indicators (Dots) */}
                {project.images.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentImageIndex === index 
                            ? 'bg-blue-500 scale-125 shadow-lg shadow-blue-500/50' 
                            : 'bg-slate-600 hover:bg-slate-400 hover:scale-110'
                        }`}
                        title={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Single Project Image (Fallback) */
              project.image && (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-auto transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
                      <FaEye className="text-4xl text-gray-600" />
                    </div>
                  )}
                </div>
              )
            )}

            {/* Description */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <FaCode className="text-white text-sm" />
                </div>
                Project Description
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Project Info */}
          <div className="space-y-6">
            {/* Technologies */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Stats */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Project Info</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.isFeatured 
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {project.isFeatured ? 'Featured' : 'Published'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Technologies</span>
                  <span className="text-white font-medium">{project.tags.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Repository</span>
                  <div className="flex gap-2">
                    {project.clientSourceCode && (
                      <span className="w-2 h-2 bg-purple-500 rounded-full" title="Frontend"></span>
                    )}
                    {project.serverSourceCode && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full" title="Backend"></span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Live Demo</span>
                  <span className={`w-2 h-2 rounded-full ${
                    project.liveLink ? 'bg-green-500' : 'bg-gray-500'
                  }`}></span>
                </div>
              </div>
            </div>

            {/* Related Actions */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/projects')}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <FaArrowLeft />
                  Back to All Projects
                </button>
                
                {isAdmin && (
                  <>
                    <button
                      onClick={handleEdit}
                      className="w-full flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <MdEdit />
                      Edit This Project
                    </button>
                    
                    <button
                      onClick={handleDelete}
                      className="w-full flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <MdDelete />
                      Delete Project
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails