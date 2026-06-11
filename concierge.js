/* Al's Hideaway AI Concierge Widget — shared loader for new pages */
(function () {
  var css = '#ah-chat-bubble{position:fixed;bottom:24px;right:24px;z-index:9999;width:58px;height:58px;border-radius:50%;background:#3a6b3a;box-shadow:0 4px 20px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .2s,box-shadow .2s;border:none;outline:none}#ah-chat-bubble:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(0,0,0,0.30)}#ah-chat-panel{position:fixed;bottom:96px;right:24px;z-index:9998;width:360px;max-height:520px;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,0.18);display:none;flex-direction:column;overflow:hidden;font-family:Inter,sans-serif}#ah-chat-panel.open{display:flex}#ah-chat-header{background:#3a6b3a;color:#fff;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}#ah-chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#f9f6f1}.ah-msg{max-width:82%;padding:10px 14px;border-radius:14px;font-size:.88rem;line-height:1.55;color:#2d2d2d}.ah-msg-bot{background:#fff;border-radius:4px 14px 14px 14px;box-shadow:0 1px 4px rgba(0,0,0,0.08);align-self:flex-start}.ah-msg-user{background:#3a6b3a;color:#fff;border-radius:14px 14px 4px 14px;align-self:flex-end}.ah-typing{display:flex;gap:5px;align-items:center;padding:10px 14px;align-self:flex-start;background:#fff;border-radius:4px 14px 14px 14px;box-shadow:0 1px 4px rgba(0,0,0,0.08)}.ah-dot{width:7px;height:7px;background:#aaa;border-radius:50%;animation:ahBounce 1.2s infinite}.ah-dot:nth-child(2){animation-delay:.2s}.ah-dot:nth-child(3){animation-delay:.4s}@keyframes ahBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}#ah-suggestions{display:flex;flex-direction:column;gap:7px;margin-top:4px}.ah-suggestion{background:#fff;border:1.5px solid #d4e4d4;border-radius:20px;padding:7px 13px;font-size:.82rem;color:#2c5230;cursor:pointer;text-align:left;transition:all .15s;font-family:Inter,sans-serif}.ah-suggestion:hover{background:#3a6b3a;color:#fff;border-color:#3a6b3a}#ah-chat-input-row{display:flex;gap:8px;padding:12px 14px;background:#fff;border-top:1px solid #eee;flex-shrink:0}#ah-chat-input{flex:1;padding:9px 13px;border:1.5px solid #d0d0d0;border-radius:20px;font-size:.88rem;outline:none;font-family:Inter,sans-serif;transition:border-color .15s}#ah-chat-input:focus{border-color:#3a6b3a}#ah-send-btn{width:38px;height:38px;border-radius:50%;background:#3a6b3a;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .15s}#ah-send-btn:hover{background:#2c5230}@media (max-width:420px){#ah-chat-panel{width:calc(100vw - 32px);right:16px;bottom:88px}#ah-chat-bubble{right:16px;bottom:16px}}';

  var html = '<div id="ah-chat-bubble" onclick="ahToggleChat()" title="Chat with our AI concierge" aria-label="Open chat"><svg id="ah-chat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="26" height="26"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l4.93-1.37A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-1 13H7v-2h4v2zm6 0h-4v-2h4v2zm0-4H7V9h10v2z"/></svg><svg id="ah-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="26" height="26" style="display:none"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></div><div id="ah-chat-panel"><div id="ah-chat-header"><div><div style="font-weight:700;font-size:1rem;">Al&#39;s Hideaway Concierge</div><div style="font-size:0.75rem;opacity:0.85;">Ask anything about our property &#129312;</div></div><a href="tel:8305103331" style="color:#fff;font-size:0.78rem;opacity:0.85;text-decoration:none;">&#128222; 830-510-3331</a></div><div id="ah-chat-messages"><div class="ah-msg ah-msg-bot">Howdy! I&#39;m the Al&#39;s Hideaway AI concierge. Ask me about our cabins, RV sites, pet policy, local drives, upcoming events &mdash; anything! &#127957;&#65039;</div><div id="ah-suggestions"><button class="ah-suggestion" onclick="ahSend(this.textContent)">&#127968; What cabins do you have?</button><button class="ah-suggestion" onclick="ahSend(this.textContent)">&#128062; Are pets allowed?</button><button class="ah-suggestion" onclick="ahSend(this.textContent)">&#128739;&#65039; What scenic drives are nearby?</button><button class="ah-suggestion" onclick="ahSend(this.textContent)">&#127881; Any local events coming up?</button><button class="ah-suggestion" onclick="ahSend(this.textContent)">&#128176; How do I save on my booking?</button></div></div><div id="ah-chat-input-row"><input id="ah-chat-input" type="text" placeholder="Type a question&hellip;" maxlength="300" /><button id="ah-send-btn" onclick="ahSend()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="20" height="20"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button></div></div>';

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    document.getElementById('ah-chat-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') window.ahSend();
    });

    var messages = [];
    var isOpen = false;
    var isLoading = false;

    window.ahToggleChat = function () {
      isOpen = !isOpen;
      var panel = document.getElementById('ah-chat-panel');
      var chatIcon = document.getElementById('ah-chat-icon');
      var closeIcon = document.getElementById('ah-close-icon');
      panel.classList.toggle('open', isOpen);
      chatIcon.style.display = isOpen ? 'none' : 'block';
      closeIcon.style.display = isOpen ? 'block' : 'none';
      if (isOpen) setTimeout(function () { document.getElementById('ah-chat-input').focus(); }, 200);
    };

    window.ahSend = function (text) {
      if (isLoading) return;
      var input = document.getElementById('ah-chat-input');
      var msg = (text || input.value).trim();
      if (!msg) return;
      var suggestions = document.getElementById('ah-suggestions');
      if (suggestions) suggestions.style.display = 'none';
      input.value = '';
      ahAddMessage(msg, 'user');
      messages.push({ role: 'user', content: msg });
      ahShowTyping();
      isLoading = true;
      document.getElementById('ah-send-btn').style.opacity = '0.5';
      fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messages })
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          ahRemoveTyping();
          isLoading = false;
          document.getElementById('ah-send-btn').style.opacity = '1';
          var reply = data.reply || "Sorry, I had a hiccup! Call us at 830-510-3331 and we'll help you out. 🤠";
          ahAddMessage(reply, 'bot');
          messages.push({ role: 'assistant', content: reply });
        })
        .catch(function () {
          ahRemoveTyping();
          isLoading = false;
          document.getElementById('ah-send-btn').style.opacity = '1';
          ahAddMessage("Oops, something went wrong on my end! Give us a call at 830-510-3331 or email alshideawayrentals@gmail.com. 🤠", 'bot');
        });
    };

    function ahAddMessage(text, role) {
      var msgs = document.getElementById('ah-chat-messages');
      var div = document.createElement('div');
      div.className = 'ah-msg ah-msg-' + role;
      div.textContent = text;
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    }
    function ahShowTyping() {
      var msgs = document.getElementById('ah-chat-messages');
      var div = document.createElement('div');
      div.className = 'ah-typing'; div.id = 'ah-typing-indicator';
      div.innerHTML = '<div class="ah-dot"></div><div class="ah-dot"></div><div class="ah-dot"></div>';
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    }
    function ahRemoveTyping() {
      var el = document.getElementById('ah-typing-indicator');
      if (el) el.remove();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
