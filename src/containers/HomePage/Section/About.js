import React, { Component } from "react";
import { connect } from "react-redux";
// import "./About.scss";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <>
        <div className="section-about section-share ">
          <div className="section-about-header">
            <span>Truyền thông nói về Đinh Lâm Huy</span>
          </div>
          <div className="section-content">
            <div className="content-left">
              {/* <iframe
                src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
           
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe> */}
            </div>
            <div className="content-right">
              ✔ Các bạn có thể làm chủ công nghệ, cũng như học được, biết được
              những kiến thức thực tế dùng tại các công ty hiện nay. Sau khi kết
              thúc khóa học này, mình tin chắc rằng dự án này đủ lớn, đủ thực tế
              để cho các bạn mới ra trường viết vào CV xin việc của mình ^^
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
