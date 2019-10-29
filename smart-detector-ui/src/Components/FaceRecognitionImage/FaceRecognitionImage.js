import React, { Component } from 'react';
import './FaceRecognitionImage.css';
import LoadingIndicator from '../../Images/LoadingIndicator.gif';


export class FaceRecognitionImage extends Component {

    componentDidMount() {
        document.getElementById('FaceRecognitionImage').style.display = 'none';
        console.log("didMount")
    }

    render() {

        //working on new bounding box
        let boxprops = this.props.box;

        boxprops.map((box, index) => {
            //creating div element for each face recognised
            let divElement = document.createElement("div");
            document.querySelector("#boundingBoxContainer") &&
                document.querySelector("#boundingBoxContainer").appendChild(divElement);
            divElement.className = "bounding-box";
            divElement.style.top = box.top_row + "px";
            divElement.style.right = box.right_col + "px";
            divElement.style.bottom = box.bottom_row + "px";
            divElement.style.left = box.left_col + "px";

            return null;
        })

        return (
            <div className="imageContent">
                <div className="imagedisplay">
                    <div id='LoadingIndicator'>
                        <img src={LoadingIndicator} alt='LoadingIndicator' />
                    </div>
                    <img id="inputimage" src={this.props.inputurl} alt=" " />
                    <img id="uploaded_image" src="" alt=" " />

                    <div id="boundingBoxContainer"></div>
                </div>
            </div>

        )
    }
}

export default FaceRecognitionImage
