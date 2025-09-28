import React from 'react'
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'

const SocialLinks = () => {
  const socialLinks = [
    {
      icon: FaLinkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/shakildv/',
      color: 'hover:text-blue-500'
    },
    {
      icon: FaGithub,
      name: 'GitHub',
      url: 'https://github.com/shakilcstdev',
      color: 'hover:text-gray-400'
    },
    {
      icon: FaTwitter,
      name: 'Twitter',
      url: 'https://x.com/EAhmed57217?t=h152o99hZK5JxjskKemfsg&s=07',
      color: 'hover:text-blue-400'
    },
    {
      icon: FaInstagram,
      name: 'Instagram',
      url: 'https://www.instagram.com/shakilahamed1782/',
      color: 'hover:text-pink-500'
    }
  ]

  return (
    <div className="space-y-4">
      <h4 
        className="text-xl font-semibold text-white"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        Follow Me
      </h4>
      <div className="flex gap-4">
        {socialLinks.map((social, index) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-12 h-12 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center text-gray-400 ${social.color} hover:border-current hover:scale-110 transition-all duration-300`}
            data-aos="zoom-in"
            data-aos-duration="600"
            data-aos-delay={100 + index * 100}
          >
            <social.icon className="text-lg" />
          </a>
        ))}
      </div>
    </div>
  )
}

export default SocialLinks