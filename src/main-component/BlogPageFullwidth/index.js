import React from  'react';

// components
import Navbar from '../../components/Navbar'
import Breadcumb from '../../components/breadcumb'

import BlogFullWidth from '../../components/BlogFullWidth'
import FooterSection from '../../components/Footer'


const BlogPageFullwidth = () => {
    return(
       <div>
           <Navbar/>
           <Breadcumb bdtitle={'Latest News'} bdsub={'Blog'}/>
           <BlogFullWidth/>
           <FooterSection/>
       </div>
    )
}

export default BlogPageFullwidth;