// Function to handle form submission for updating the website
document.getElementById("updateForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    var formData = new FormData(this);
    
    var message = "🚀🌟 **New Update Request** 🌟🚀\n\n";
    formData.forEach(function(value, key) {
        message += "**" + key.charAt(0).toUpperCase() + key.slice(1) + ":** " + value + "\n";
    });

    var webhookURL = "https://discord.com/api/webhooks/1244497727220617287/vpl9hwcn5URlipoz3x_Yymw-2EL3-WrrGCEEyZRdxYPAd7OHPh35ur62dCXwmmAIwObx";
    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: "",
            embeds: [{
                title: "New Website Update Submission!",
                color: 3066993, 
                description: message
            }]
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        alert("Update request submitted successfully!");
        this.reset(); 
    })
    .catch(error => {
        console.error("There was a problem with your fetch operation:", error);
        alert("Failed to submit update request. Please try again later.");
    });
});

// Function to handle form submission for submitting prices
document.getElementById('priceForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const currentTime = new Date().getTime();
    if (currentTime - lastSubmissionTime < 25000) {
        alert('Please wait 25 seconds between submissions.');
        return;
    }

    const productName = document.getElementById('productName').value;
    let productPrice = document.getElementById('productPrice').value.replace(/,/g, '');

    if (!/^\d+$/.test(productPrice)) {
        alert('Please enter a valid price.');
        return;
    }

    productPrice = parseInt(productPrice, 10);
    if (productPrice > 1000000) {
        alert('Price cannot be more than 1,000,000.');
        return;
    }

    productPrice = productPrice.toLocaleString();

    const webhookURL = 'https://discord.com/api/webhooks/1244497727220617287/vpl9hwcn5URlipoz3x_Yymw-2EL3-WrrGCEEyZRdxYPAd7OHPh35ur62dCXwmmAIwObx';
    const payload = {
        embeds: [{
            title: "New Price Submission!",
            color: 3066993,
            fields: [
                {
                    name: "Product",
                    value: productName,
                    inline: true
                },
                {
                    name: "Price",
                    value: `$${productPrice}`,
                    inline: true
                }
            ],
            timestamp: new Date()
        }],
        content: "New Price Submitted"
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => {
        if (response.ok) {
            document.getElementById('confirmationMessage').textContent = 'Price submitted successfully!';
            document.getElementById('priceForm').reset();
            openModal();
        } else {
            document.getElementById('confirmationMessage').textContent = 'Error submitting price.';
            openModal();
        }
    }).catch(error => {
        document.getElementById('confirmationMessage').textContent = 'Error submitting price: ' + error;
        openModal();
    });

    lastSubmissionTime = currentTime;
});

// Function to open the confirmation modal
function openModal() {
    document.getElementById('confirmationModal').style.display = 'flex';
}

// Function to close the confirmation modal
function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

// Format number inputs with commas for thousands separator
document.getElementById('productPrice').addEventListener('input', function(e) {
    let value = e.target.value.replace(/,/g, '');
    if (value && /^\d+$/.test(value)) {
        value = parseInt(value, 10).toLocaleString();
        e.target.value = value;
    } else {
        e.target.value = value;
    }
});

// Function to send a message to Discord
function sendDiscordMessage(message) {
    var webhookURL = "https://discord.com/api/webhooks/1244492846698860634/HQKLhGISvncGm4IuNNUiWbP8GZVsm6n2FPEl8Wuu_bqj-uu-7T8Mx_ys-djKFvPBGmH1";
    var data = JSON.stringify({ content: message });

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    })
    .then(response => console.log('Message sent to Discord'))
    .catch(error => console.error('Error sending message to Discord:', error));
}

// Send a message to Discord when the website is visited
const visited = sessionStorage.getItem('visited');
if (!visited) {
    sendDiscordMessage("🚀Someone Visited The Website Update Request Site!🚀");
    sessionStorage.setItem('visited', true);
}
