import React, { Component } from 'react';
import './ImageForm.css';

class ImageForm extends Component {
    render() {
        return (
            <div>
                <p className="imagetext">
                    Face Recognition on image. Give it a try!!!
                </p>
                <div className="detectparams">
                    <input type="text"
                        className="imagelink"
                        id="imagelinkurl"
                        placeholder=" Enter image url/path"
                        onChange={this.props.onInputChange}
                    />

                    <span style={{fontWeight: "bold", color: "yellow"}}>{" OR "}</span>

                    <input type="file"
                        id="imageupload"
                        onChange={(e) => this.props.readImageFile(e)} />

                    <button onClick={this.props.cleanFileUpload} className="clear">clear</button>

                    <button className="detect" onClick={this.props.onButtonDetect} >Detect</button>
                </div>
            </div>
        )
    }
}

export default ImageForm
