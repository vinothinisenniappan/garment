/**
 * Main JavaScript File
 * Client-side functionality for the website
 */

// Form validation and enhancements
document.addEventListener('DOMContentLoaded', function() {
  
  // Auto-dismiss alerts after 5 seconds
  const alerts = document.querySelectorAll('.alert:not(.alert-permanent)');
  alerts.forEach(alert => {
    setTimeout(() => {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    }, 5000);
  });
  
  // Confirm delete actions
  const deleteButtons = document.querySelectorAll('[data-delete]');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (!confirm('Are you sure you want to delete this item?')) {
        e.preventDefault();
        return false;
      }
    });
  });
  
  // Update sample status via AJAX
  const statusUpdateForms = document.querySelectorAll('.status-update-form');
  statusUpdateForms.forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const sampleId = form.dataset.sampleId;
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.disabled = true;
      submitButton.textContent = 'Updating...';
      
      try {
        const response = await fetch(`/admin/samples/${sampleId}/status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formData))
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Reload page to show updated status
          window.location.reload();
        } else {
          alert('Error updating status: ' + (data.error || 'Unknown error'));
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error updating status. Please try again.');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  });
  
  // Update buyer status via AJAX
  const buyerStatusForms = document.querySelectorAll('.buyer-status-form');
  buyerStatusForms.forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const buyerId = form.dataset.buyerId;
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.disabled = true;
      submitButton.textContent = 'Updating...';
      
      try {
        const response = await fetch(`/admin/buyers/${buyerId}/status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formData))
        });
        
        const data = await response.json();
        
        if (data.success) {
          window.location.reload();
        } else {
          alert('Error updating status: ' + (data.error || 'Unknown error'));
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error updating status. Please try again.');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  });
  
  // Delete product via AJAX
  const deleteProductButtons = document.querySelectorAll('[data-delete-product]');
  deleteProductButtons.forEach(button => {
    button.addEventListener('click', async function(e) {
      e.preventDefault();
      
      if (!confirm('Are you sure you want to delete this product?')) {
        return;
      }
      
      const productId = button.dataset.deleteProduct;
      const row = button.closest('tr');
      
      try {
        const response = await fetch(`/admin/products/${productId}`, {
          method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
          row.remove();
          // Show success message
          const alertDiv = document.createElement('div');
          alertDiv.className = 'alert alert-success alert-dismissible fade show';
          alertDiv.innerHTML = '<strong>Success!</strong> Product deleted successfully. <button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
          document.querySelector('.container-fluid').insertBefore(alertDiv, document.querySelector('.container-fluid').firstChild);
        } else {
          alert('Error deleting product: ' + (data.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting product. Please try again.');
      }
    });
  });
  
  // Image preview for product images input
  const imageInputs = document.querySelectorAll('input[name="images"]');
  imageInputs.forEach(input => {
    input.addEventListener('change', function() {
      // Basic validation - in production, you'd want more robust image handling
      console.log('Image input changed');
    });
  });
});

// Helper function to format dates
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { formatDate };
}

