(function () {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function insertBeast(beastURL) {
    removeExistingBeasts();
    let beastImage = document.createElement("img");
    beastImage.setAttribute("src", beastURL);
    beastImage.style.height = "100vh";
    beastImage.className = "beastify-image";
    document.body.appendChild(beastImage);
  }

  /**
   * Remove every beast from the page.
   */
  function removeExistingBeasts() {
    let existingBeasts = document.querySelectorAll(".beastify-image");
    for (let beast of existingBeasts) {
      beast.remove();
    }
  }

  function calculate() {
    console.log(">> calc1");
    document.querySelectorAll(".catalog-grid__item").forEach((e) => {
      var price = e.querySelector(".product-price");
      var itemName = e.querySelector("a.utk-product-card-name > span").textContent.trim();

      var namePattern = /.* (\d+) (г|кг)$/;
      var match = namePattern.exec(itemName);
      // console.log(match);
      if (match[1] != null) {
        var quantity = parseFloat(match[1]);
        var unit = match[2];
        if (unit == "г") {
          quantity = quantity / 1000;
        }
        var priceValue = price.textContent.trim();
        var pricePattern = /(.*)(.)$/;
        var match2 = pricePattern.exec(priceValue);
        var p = parseFloat(match2[1].replace(",", "."));
        console.log(">> " + quantity);
        price.textContent += (p / quantity).toFixed(2).toString()
      }
    });
  }

  function calculatePrice(container) {
    var price = container.querySelector(".product-price");
    var itemName = container.querySelector("a.utk-product-card-name > span").textContent.trim();

    var itemNamePattern = /.* (\d+) (г|кг|мл|л)$/;
    var itemNameMatch = itemNamePattern.exec(itemName);
    // console.log(match);
    if (itemNameMatch[1] != null) {
      var quantity = parseFloat(itemNameMatch[1]);
      var unit = itemNameMatch[2];
      if (unit === "г" || unit === "мл") {
        quantity = quantity / 1000;
      }
      var priceValue = price.textContent.trim();
      
      var pricePattern = /(.*)(.)$/;
      var priceMatch = pricePattern.exec(priceValue);
      var pp = priceMatch[1].replace(",", ".").replace(/\s+/, "");
      var p = parseFloat(pp);
      console.log(">> " + priceValue + " >> " + priceMatch[1] + " >> " + pp  + " >> " + p);
      // console.log(">> " + quantity);
       return (p / quantity).toFixed(2).toString();
    }
  }

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "beastify") {
      insertBeast(message.beastURL);
    } else if (message.command === "reset") {
      removeExistingBeasts();
    } else if (message.command === "calculate") {
      calculate();
    }

  });

  let observer = new MutationObserver(mutations => {
    console.log(">> observe");
    for (let mutation of mutations) {
      for (let addedNode of mutation.addedNodes) {
        // console.log(addedNode.nodeName);
        if (addedNode.nodeName === "PRODUCT-CARD") {
          // console.log("Inserted product", addedNode);
          var price = calculatePrice(addedNode);
          addedNode.querySelector(".product-price").textContent += " | " + price
        }
      }
    }
  });
  observer.observe(document, { childList: true, subtree: true });

})();
