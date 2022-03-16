import React from  'react';

// components
import Navbar from '../../components/Navbar'
import Breadcumb from '../../components/breadcumb'

import BlogDetailFullwidth from '../../components/BlogDetailsFullwidth'
import FooterSection from '../../components/Footer'


const BlogDetailsFullwidth = () => {
    return(
       <div>
           <Navbar/>
           <Breadcumb bdtitle={'Latest News'} bdsub={'Blog Single'}/>
           <BlogDetailFullwidth/>
           <FooterSection/>
       </div>
    )
}

export default BlogDetailsFullwidth;