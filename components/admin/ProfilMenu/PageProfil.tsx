import React from "react";

export default function PageProfil(){
    return(
        <div style={{ position: 'relative', minHeight: '500px' }}>

            <div style={{
                    width:200,
                    height: 200,
                    backgroundColor:"black",
                    border: "5px solid white",
                    borderRadius: "50%",
                    // position: "absolute",
                    // top: 70,
                    // left: 200,

                }}>
            </div>
            {/* <div style={{
                width: 600,
                height: 700,
                position: 'relative',
                margin: '20px auto',
            }}>

                </div>
                

            </div> */}
                    <div style={{
                        paddingTop: '16px'
                    }}>
                        <h1 className="p-2 text-xl text-gray-900 font-medium leading-8">Muhammad Aryandi</h1>
                        <div className="p-2 text-gray-400 text-md font-semibold">
                            Frontend Engineers
                       </div>

                       <table className="text-md text-left flex">
                            <tbody>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Gender</td>
                                <td className="px-2 py-2">Male</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                <td className="px-2 py-2">+88 9955221114</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Private Email</td>
                                <td className="px-2 py-2">lorem@exmaple.com</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Office Email</td>
                                <td className="px-2 py-2">lorem@exmaple.com</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                                <td className="px-2 py-2">street-3, lorem street</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Join Date</td>
                                <td className="px-2 py-2">XX-XX-XXXX</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">marital status</td>
                                <td className="px-2 py-2">--</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Kids</td>
                                <td className="px-2 py-2">--</td>
                            </tr>
                            
                        </tbody></table>
                    </div>
        </div>
    )
}