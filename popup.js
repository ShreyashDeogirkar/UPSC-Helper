document.addEventListener('DOMContentLoaded', () => {
    const factElement = document.getElementById('fact');
    const button = document.getElementById('fetch-fact');
    const topicInput = document.getElementById('topic');
    const apiKey = 'SniCleDkTLTdawPDRP5noA==41PSUmXVD6ti98Qx'; 
  
    function fetchFact(topic) {
      const url = `https://api.api-ninjas.com/v1/historicalevents?text=${encodeURIComponent(topic)}`;
  
      fetch(url, {
        headers: {
          'X-Api-Key': apiKey
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const randomEvent = data[Math.floor(Math.random() * data.length)];
          // Format the date
          const year = randomEvent.year || '';
          const month = randomEvent.month || '';
          const day = randomEvent.day || '';
          const formattedDate = year && month && day ? `${day}-${month}-${year}` : year;
          // Create the fact string
          const fact = `${formattedDate}: ${randomEvent.event}`;
          factElement.textContent = fact;
        } else {
          factElement.textContent = 'No historical facts available for this topic.';
        }
      })
      .catch(error => {
        factElement.textContent = 'Failed to fetch a historical fact.';
        console.error('Error fetching the historical fact:', error);
      });
    }
  
    button.addEventListener('click', () => {
      const topic = topicInput.value.trim();
      if (topic) {
        fetchFact(topic);
      } else {
        factElement.textContent = 'Please enter a topic.';
      }
    });
  });
  