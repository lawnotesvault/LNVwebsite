// Initialize Supabase Client
const supabaseUrl = 'https://ortuvtuiqtrwdimuokte.supabase.co';
const supabaseKey = 'sb_publishable_alIoM5ItK8g1pCr6BBBzBA_tzEhyw2C';

const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// DOM Elements
const loginPanel = document.getElementById('login-panel');
const dashboardPanel = document.getElementById('dashboard-panel');
const loginForm = document.getElementById('loginForm');
const noteForm = document.getElementById('noteForm');
const notesList = document.getElementById('notesList');
const adminUserEmail = document.getElementById('adminUserEmail');
const publishBtn = document.getElementById('publishBtn');

// Initialize Dashboard
checkSession();

// Check if user is logged in
async function checkSession() {
  const { data: { session }, error } = await supabaseClient.auth.getSession();
  
  if (session) {
    // User is logged in
    loginPanel.classList.add('hidden');
    dashboardPanel.classList.remove('hidden');
    adminUserEmail.textContent = `Logged in as: ${session.user.email}`;
    loadNotes();
  } else {
    // User is not logged in
    loginPanel.classList.remove('hidden');
    dashboardPanel.classList.add('hidden');
  }
}

// Handle Login
async function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const loginBtn = document.getElementById('loginBtn');
  
  const originalText = loginBtn.innerHTML;
  loginBtn.disabled = true;
  loginBtn.innerHTML = '<div class="spinner"></div>';
  
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password
  });
  
  loginBtn.disabled = false;
  loginBtn.innerHTML = originalText;
  
  if (error) {
    showToast(`Error: ${error.message}`);
  } else {
    showToast('Signed in successfully! 🔓');
    checkSession();
  }
}

// Handle Logout
async function handleLogout() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    showToast(`Error signing out: ${error.message}`);
  } else {
    showToast('Signed out successfully! 🔒');
    checkSession();
  }
}

// Load Published Notes
async function loadNotes() {
  notesList.innerHTML = '<p style="color:var(--grey-mid); font-size:0.9rem;">Loading catalogue...</p>';
  
  const { data, error } = await supabaseClient
    .from('products')
    .select('*')
    .order('id', { ascending: false });
    
  if (error) {
    notesList.innerHTML = `<p style="color:#c0392b; font-size:0.9rem;">Error: ${error.message}</p>`;
    return;
  }
  
  if (data.length === 0) {
    notesList.innerHTML = '<p style="color:var(--grey-mid); font-size:0.9rem;">No notes published yet.</p>';
    return;
  }
  
  notesList.innerHTML = data.map(note => `
    <div class="note-list-item">
      <div class="note-list-info">
        <div class="note-list-emoji">${note.emoji || '📄'}</div>
        <div>
          <div class="note-list-name">${note.name}</div>
          <div class="note-list-price">₹${note.price} · ${note.pages || 0} Pages</div>
        </div>
      </div>
      <button class="btn-admin btn-admin-danger" onclick="deleteNote(${note.id})">Delete</button>
    </div>
  `).join('');
}

// Delete Note
async function deleteNote(id) {
  if (!confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
    return;
  }
  
  const { error } = await supabaseClient
    .from('products')
    .delete()
    .eq('id', id);
    
  if (error) {
    showToast(`Error: ${error.message}`);
  } else {
    showToast('Note deleted successfully!');
    loadNotes();
  }
}

// Helper to upload file to storage
async function uploadFile(bucket, folder, file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  
  const { data, error } = await supabaseClient.storage
    .from(bucket)
    .upload(fileName, file);
    
  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabaseClient.storage
    .from(bucket)
    .getPublicUrl(fileName);
    
  return publicUrl;
}

// Handle Publish Note
async function handlePublish(e) {
  e.preventDefault();
  
  const originalText = publishBtn.innerHTML;
  publishBtn.disabled = true;
  publishBtn.innerHTML = '<div class="spinner"></div> Publishing...';
  
  try {
    const name = document.getElementById('noteName').value;
    const subtitle = document.getElementById('noteSubtitle').value;
    const price = parseFloat(document.getElementById('notePrice').value);
    const pages = parseInt(document.getElementById('notePages').value);
    const emoji = document.getElementById('noteEmoji').value;
    const badge = document.getElementById('noteBadge').value || null;
    const color = document.getElementById('noteColor').value;
    const colorLight = document.getElementById('noteColorLight').value;
    const shortDesc = document.getElementById('noteShortDesc').value;
    const description = document.getElementById('noteDesc').value;
    
    // Split and clean lists
    const whatsInside = document.getElementById('noteWhatsInside').value
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
      
    const topics = document.getElementById('noteTopics').value
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
      
    const features = document.getElementById('noteFeatures').value
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
      
    // Default FAQs
    const faqs = [
      { q: "Is this suitable for 1st year LLB students?", a: `Yes, this note covers the standard LLB syllabus. It is designed to be highly exam-oriented.` },
      { q: "Does it cover the latest amendments?", a: "Yes, all our notes are updated to reflect the latest legislation, amendments, and Supreme Court rulings." },
      { q: "How will I receive the PDF?", a: "After purchase/payment verification, the notes PDF will be delivered directly to your WhatsApp number." }
    ];
    
    // Upload files
    const coverFile = document.getElementById('noteCoverFile').files[0];
    const pdfFile = document.getElementById('notePdfFile').files[0];
    
    let coverImgUrl = '';
    let pdfUrl = '';
    
    if (coverFile) {
      coverImgUrl = await uploadFile('notes-vault', 'covers', coverFile);
    }
    
    if (pdfFile) {
      pdfUrl = await uploadFile('notes-vault', 'pdfs', pdfFile);
    }
    
    // Construct database entry
    const noteData = {
      name,
      subtitle,
      price,
      pages,
      emoji,
      badge,
      color,
      colorlight: colorLight,
      shortdesc: shortDesc,
      description,
      whatsinside: whatsInside,
      topics,
      features,
      coverimg: coverImgUrl,
      pdfurl: pdfUrl,
      samplepages: true,
      faqs
    };
    
    // Insert into DB
    const { data, error } = await supabaseClient
      .from('products')
      .insert([noteData]);
      
    if (error) throw error;
    
    showToast('Note published successfully! 🚀');
    noteForm.reset();
    loadNotes();
    
  } catch (error) {
    showToast(`Error: ${error.message}`);
    console.error(error);
  } finally {
    publishBtn.disabled = false;
    publishBtn.innerHTML = originalText;
  }
}

// Toast Notification
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}
