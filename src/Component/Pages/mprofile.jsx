import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import '../../Assets/css/mprofile.css';
import api from "../../api";
import { toast } from "react-toastify";
const MProfile = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    old_password: "",
    new_password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await api.getUserProfile();
      if (response.data && response.status == 200 && !response.error) {
        setFormData({
          first_name: response.data[0]?.firstname || "",
          last_name: response.data[0]?.lastname || "",
          email: response.data[0]?.email || "",
          old_password: "",
          new_password: ""
        });
      } else {
        toast.error("Failed to load profile data");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("An error occurred while loading profile data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let fieldName = id.replace("form", "").toLowerCase();
    
    if (fieldName === "firstname") fieldName = "first_name";
    if (fieldName === "lastname") fieldName = "last_name";
    if (fieldName === "oldpassword") fieldName = "old_password";
    if (fieldName === "newpassword") fieldName = "new_password";
    if (fieldName === "old_password" || fieldName === "new_password") {
      setPasswordError("");
    }
    
    setFormData({
      ...formData,
      [fieldName]: value
    });
  };
 const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.old_password && !formData.new_password) {
    setPasswordError("New password is required when changing password");
    return;
  }
  
  setIsLoading(true);

  let updateData = {
    firstname: formData.first_name,
    lastname: formData.last_name,
  };
  
  if (formData.old_password) {
    updateData.old_password = formData.old_password;
    updateData.new_password = formData.new_password;
  }

  try {
    const profileResponse = await api.updateUserProfile(updateData);
    if (profileResponse.status === 200) {
      toast.success("Profile updated successfully");
      await fetchUserProfile();
    } else {
      toast.error( profileResponse.message || "Failed to update profile");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    toast.error( "An error occurred while updating your profile");
  } finally {
    setIsLoading(false);
  }
};

  const handleCancel = () => {
    setPasswordError("");
    fetchUserProfile();
  };
  const isNewPasswordFieldActive = formData.old_password.length > 0;

  return (
    <div className="main_profile">
      <h2 className="text-center our_team_head pb-4 py-5 gap-3">Overview</h2>
      <Container className="py-5 text-white">
        <p className="text-muted mb-4">Update your personal information</p>
        <Card className="bg-dark border-0 text-white p-4">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter first name" 
                    value={formData.first_name}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter last name" 
                    value={formData.last_name}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    value={formData.email} 
                    disabled 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formOldPassword">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Enter current password" 
                    value={formData.old_password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="formNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Enter new password" 
                    value={formData.new_password}
                    onChange={handleInputChange}
                    disabled={!isNewPasswordFieldActive || isLoading}
                  />
                  {passwordError && (
                    <div className="text-danger mt-1" style={{fontSize: "0.875rem"}}>
                      {passwordError}
                    </div>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end">
              <Button 
                variant="secondary" 
                className="me-2"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                variant="info" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default MProfile;