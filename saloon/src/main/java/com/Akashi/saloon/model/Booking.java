package com.Akashi.saloon.model;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String customerEmail;
    private LocalDateTime appointmentDateTime;
    private String contactMethod; // "email" or "whatsapp"
    private String status; // e.g. PENDING, APPROVED, REJECTED

    @ManyToOne
    @JoinColumn(name = "package_id")
    private Package pkg;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public LocalDateTime getAppointmentDateTime() { return appointmentDateTime; }
    public void setAppointmentDateTime(LocalDateTime appointmentDateTime) { this.appointmentDateTime = appointmentDateTime; }

    public String getContactMethod() { return contactMethod; }
    public void setContactMethod(String contactMethod) { this.contactMethod = contactMethod; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Package getPkg() { return pkg; }
    public void setPkg(Package pkg) { this.pkg = pkg; }
}
