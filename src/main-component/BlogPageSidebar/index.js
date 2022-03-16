import React from  'react';

// components
import Navbar from '../../components/Navbar'
import Breadcumb from '../../components/breadcumb'

import BlogList from '../../components/BlogList'
import FooterSection from '../../components/Footer'


const BlogPageSidebar = () => {
    return(
       <div>
           <Navbar/>
           <Breadcumb bdtitle={'Latest News'} bdsub={'Blog'}/>
           <BlogList/>
           <FooterSection/>
       </div>
    )
}

export default BlogPageSidebar;