import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import '../../Assets/css/mprofile.css';
import api from "../../api";

const MProfile = () => {
  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    old_password: "",
    new_password: ""
  });
  console.log("🚀 ~ MProfile ~ formData:", formData)
  const [alert, setAlert] = useState({
    show: false,
    variant: "success",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await api.getUserProfile();
      console.log("🚀 ~ fetchUserProfile ~ response:", response)
      if (response.data && response.status == 200 && !response.error) {
        setFormData({
          id: response.data[0]?.id || "",
          first_name: response.data[0]?.firstname || "",
          last_name: response.data[0]?.lastname || "",
          email: response.data[0]?.email || "",
          phone: response.phone || "",
          old_password: "",
          new_password: ""
        });
      } else {
        showAlert("danger", "Failed to load profile data");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      showAlert("danger", "An error occurred while loading profile data");
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
    
    // Map field names correctly
    if (fieldName === "firstname") fieldName = "first_name";
    if (fieldName === "lastname") fieldName = "last_name";
    if (fieldName === "oldpassword") fieldName = "old_password";
    if (fieldName === "newpassword") fieldName = "new_password";
    
    console.log("Field being updated:", id, "->", fieldName, "with value:", value);
    
    setFormData({
      ...formData,
      [fieldName]: value
    });
  };

  const showAlert = (variant, message) => {
    setAlert({
      show: true,
      variant,
      message
    });

    setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 5000);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  let updateData = {
    id: formData.id,
    first_name: formData.first_name,
    last_name: formData.last_name,
    phone: formData.phone || ""
  };
  
  if (formData.new_password) {
    updateData.old_password = formData.old_password;
    updateData.new_password = formData.new_password;
  }

  try {
    const profileResponse = await api.updateUserProfile(updateData);

    if (profileResponse.status === 200) {
      showAlert("success", "Profile updated successfully");
      // Fetch updated user profile after successful update
      await fetchUserProfile();
    } else {
      showAlert("danger", profileResponse.data?.message || "Failed to update profile");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    showAlert("danger", "An error occurred while updating your profile");
  } finally {
    setIsLoading(false);
  }
};

  const handleCancel = () => {
    fetchUserProfile();
  };

  return (
    <div className="main_profile">
      <h2 className="text-center our_team_head pb-4 py-5 gap-3">Overview</h2>
      <Container className="py-5 text-white">
        <p className="text-muted mb-4">Update your personal information</p>

        {alert.show && (
          <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
            {alert.message}
          </Alert>
        )}

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
                  <Form.Text className="text-muted">
                    Email cannot be changed
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone Number (Optional)</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Phone Number (Optional)" 
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
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
              <Col md={6}>
                <Form.Group controlId="formNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Enter new password" 
                    value={formData.new_password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
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