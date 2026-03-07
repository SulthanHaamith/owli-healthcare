import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "owli2026@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "change-this-on-first-login";
  const adminName = process.env.ADMIN_NAME || "Admin";
  const adminPhone = process.env.ADMIN_PHONE || "6379610554";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcryptjs.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        phone: adminPhone,
        passwordHash,
        role: "ADMIN",
      },
    });
    console.log("Admin user created");
  } else {
    console.log("Admin user already exists");
  }

  // 2. Seed Services
  const services = [
    {
      name: "Hydrotherapy",
      nameTamil: "நீர் சிகிச்சை",
      slug: "hydrotherapy",
      description:
        "Hydrotherapy uses water at various temperatures and pressures to stimulate healing. Our treatments include hip bath, spinal bath, steam bath, and enema therapy. This natural approach helps improve circulation, relieve pain, and detoxify the body through the therapeutic application of water.",
      descriptionTamil:
        "நீர் சிகிச்சை பல்வேறு வெப்பநிலை மற்றும் அழுத்தங்களில் நீரைப் பயன்படுத்தி குணப்படுத்தலைத் தூண்டுகிறது. எங்கள் சிகிச்சைகளில் இடுப்பு குளியல், முதுகெலும்பு குளியல், நீராவி குளியல் மற்றும் எனிமா சிகிச்சை ஆகியவை அடங்கும்.",
      icon: "Droplets",
      category: "core",
      duration: "30-60 minutes",
      price: 500,
    },
    {
      name: "Mud Therapy",
      nameTamil: "மண் சிகிச்சை",
      slug: "mud-therapy",
      description:
        "Mud therapy is one of the oldest naturopathy treatments that harnesses the earth's healing power. We offer mud pack applications, mud baths, and clay treatments that help draw out toxins, reduce inflammation, and improve skin health naturally.",
      descriptionTamil:
        "மண் சிகிச்சை என்பது பூமியின் குணப்படுத்தும் சக்தியைப் பயன்படுத்தும் மிகப் பழமையான இயற்கை மருத்துவ சிகிச்சைகளில் ஒன்றாகும். மண் பொதி, மண் குளியல் மற்றும் களிமண் சிகிச்சைகள் நச்சுக்களை வெளியேற்ற உதவுகின்றன.",
      icon: "Leaf",
      category: "core",
      duration: "30-45 minutes",
      price: 400,
    },
    {
      name: "Diet Therapy / Nutrition Counseling",
      nameTamil: "உணவு சிகிச்சை / ஊட்டச்சத்து ஆலோசனை",
      slug: "diet-therapy",
      description:
        "Our diet therapy program creates personalized nutrition plans based on your health condition. We offer therapeutic fasting guidance, detox diet plans, and customized meal plans that support your body's natural healing process and promote long-term wellness.",
      descriptionTamil:
        "எங்கள் உணவு சிகிச்சை திட்டம் உங்கள் உடல்நிலையின் அடிப்படையில் தனிப்பயன் ஊட்டச்சத்து திட்டங்களை உருவாக்குகிறது. சிகிச்சை உண்ணாநோன்பு வழிகாட்டுதல், நச்சு நீக்க உணவுத் திட்டங்கள் வழங்குகிறோம்.",
      icon: "UtensilsCrossed",
      category: "core",
      duration: "45-60 minutes",
      price: 600,
    },
    {
      name: "Massage Therapy",
      nameTamil: "மசாஜ் சிகிச்சை",
      slug: "massage-therapy",
      description:
        "Our therapeutic massage treatments include full body oil massage, specific therapeutic massage, and reflexology. These treatments improve blood circulation, relieve muscle tension, reduce stress, and promote overall well-being through skilled manual therapy.",
      descriptionTamil:
        "எங்கள் சிகிச்சை மசாஜ் முழு உடல் எண்ணெய் மசாஜ், குறிப்பிட்ட சிகிச்சை மசாஜ் மற்றும் ரிஃப்ளெக்ஸாலஜி ஆகியவை அடங்கும். இவை இரத்த ஓட்டத்தை மேம்படுத்தி, தசை பதற்றத்தைக் குறைக்கின்றன.",
      icon: "Hand",
      category: "core",
      duration: "45-90 minutes",
      price: 800,
    },
    {
      name: "Yoga Therapy",
      nameTamil: "யோகா சிகிச்சை",
      slug: "yoga-therapy",
      description:
        "Our yoga therapy program combines asanas (postures), pranayama (breathing exercises), meditation, and therapeutic yoga tailored to your health condition. This holistic approach strengthens the body, calms the mind, and promotes complete physical and mental wellness.",
      descriptionTamil:
        "எங்கள் யோகா சிகிச்சை ஆசனங்கள், பிராணாயாமம், தியானம் மற்றும் உங்கள் உடல்நிலைக்கு ஏற்ற சிகிச்சை யோகா ஆகியவற்றை இணைக்கிறது. இந்த முழுமையான அணுகுமுறை உடலை வலுப்படுத்தி மனதை அமைதிப்படுத்துகிறது.",
      icon: "Activity",
      category: "core",
      duration: "60 minutes",
      price: 500,
    },
    {
      name: "Acupuncture / Acupressure",
      nameTamil: "குத்தூசி சிகிச்சை / அக்குபிரஷர்",
      slug: "acupuncture",
      description:
        "Acupuncture and acupressure therapies work by stimulating specific points on the body to restore energy flow. Effective for pain management, stress relief, and treating various chronic conditions through meridian therapy techniques.",
      descriptionTamil:
        "குத்தூசி சிகிச்சை மற்றும் அக்குபிரஷர் உடலின் குறிப்பிட்ட புள்ளிகளைத் தூண்டி ஆற்றல் ஓட்டத்தை மீட்டமைக்கிறது. வலி மேலாண்மை, மன அழுத்த நிவாரணம் மற்றும் பல்வேறு நாள்பட்ட நிலைகளுக்கு பயனுள்ளது.",
      icon: "Zap",
      category: "core",
      duration: "30-45 minutes",
      price: 700,
    },
    {
      name: "Magnetotherapy",
      nameTamil: "காந்த சிகிச்சை",
      slug: "magnetotherapy",
      description:
        "Magnetotherapy uses magnetic fields to promote healing and relieve chronic pain. This non-invasive treatment helps with joint pain, inflammation, and circulation problems by harnessing the therapeutic power of magnetism.",
      descriptionTamil:
        "காந்த சிகிச்சை குணப்படுத்தலை ஊக்குவிக்கவும் நாள்பட்ட வலியைக் குறைக்கவும் காந்தப் புலங்களைப் பயன்படுத்துகிறது. இந்த ஊடுருவாத சிகிச்சை மூட்டு வலி, வீக்கம் மற்றும் இரத்த ஓட்ட பிரச்சனைகளுக்கு உதவுகிறது.",
      icon: "Magnet",
      category: "core",
      duration: "20-30 minutes",
      price: 400,
    },
    {
      name: "Chromo Therapy (Color Therapy)",
      nameTamil: "நிற சிகிச்சை",
      slug: "chromo-therapy",
      description:
        "Chromo therapy uses specific colors and light to balance energy in the body. Each color has unique healing properties that can help with various physical and emotional conditions, promoting harmony and wellness.",
      descriptionTamil:
        "நிற சிகிச்சை உடலில் ஆற்றலை சமநிலைப்படுத்த குறிப்பிட்ட நிறங்கள் மற்றும் ஒளியைப் பயன்படுத்துகிறது. ஒவ்வொரு நிறமும் தனித்துவமான குணப்படுத்தும் பண்புகளைக் கொண்டுள்ளது.",
      icon: "Palette",
      category: "core",
      duration: "20-30 minutes",
      price: 350,
    },
    {
      name: "Detox & Panchakarma Programs",
      nameTamil: "நச்சு நீக்கம் & பஞ்சகர்மா திட்டங்கள்",
      slug: "detox-panchakarma",
      description:
        "Our comprehensive detox programs are available in 7-day, 14-day, and 21-day packages. Combining multiple naturopathy therapies, these programs deeply cleanse and rejuvenate your body, restoring optimal health and vitality.",
      descriptionTamil:
        "எங்கள் விரிவான நச்சு நீக்க திட்டங்கள் 7 நாள், 14 நாள் மற்றும் 21 நாள் தொகுப்புகளில் கிடைக்கின்றன. பல இயற்கை மருத்துவ சிகிச்சைகளை இணைத்து, உங்கள் உடலை ஆழமாக சுத்தம் செய்து புத்துணர்வு அளிக்கின்றன.",
      icon: "Sparkles",
      category: "specialized",
      duration: "7-21 days",
      price: 5000,
    },
    {
      name: "Weight Management Program",
      nameTamil: "எடை மேலாண்மை திட்டம்",
      slug: "weight-management",
      description:
        "A comprehensive weight management program combining personalized diet plans, targeted exercises, and naturopathy therapies. This multi-faceted approach addresses the root causes of weight gain and helps achieve sustainable results.",
      descriptionTamil:
        "தனிப்பயன் உணவுத் திட்டங்கள், இலக்கு உடற்பயிற்சிகள் மற்றும் இயற்கை மருத்துவ சிகிச்சைகளை இணைக்கும் விரிவான எடை மேலாண்மை திட்டம். எடை அதிகரிப்பின் மூல காரணங்களை நிவர்த்தி செய்கிறது.",
      icon: "Scale",
      category: "specialized",
      duration: "4-12 weeks",
      price: 3000,
    },
    {
      name: "Stress & Anxiety Management",
      nameTamil: "மன அழுத்தம் & பதற்ற மேலாண்மை",
      slug: "stress-management",
      description:
        "Our stress management program combines yoga, professional counseling, and relaxation therapies to help you overcome stress and anxiety. Learn techniques for lasting mental peace and emotional well-being.",
      descriptionTamil:
        "எங்கள் மன அழுத்த மேலாண்மை திட்டம் யோகா, தொழில்முறை ஆலோசனை மற்றும் தளர்வு சிகிச்சைகளை இணைத்து மன அழுத்தம் மற்றும் பதற்றத்தை சமாளிக்க உதவுகிறது.",
      icon: "Brain",
      category: "specialized",
      duration: "60-90 minutes",
      price: 800,
    },
    {
      name: "Chronic Pain Management",
      nameTamil: "நாள்பட்ட வலி மேலாண்மை",
      slug: "chronic-pain-management",
      description:
        "Specialized treatment for chronic pain conditions including back pain, arthritis, and migraines. Our integrated approach combines multiple therapies to provide lasting relief without medication dependency.",
      descriptionTamil:
        "முதுகுவலி, மூட்டுவலி மற்றும் ஒற்றைத் தலைவலி உள்ளிட்ட நாள்பட்ட வலி நிலைகளுக்கான சிறப்பு சிகிச்சை. மருந்து சார்பு இல்லாமல் நிலையான நிவாரணம் வழங்குகிறது.",
      icon: "HeartPulse",
      category: "specialized",
      duration: "45-60 minutes",
      price: 700,
    },
    {
      name: "Women's Wellness",
      nameTamil: "பெண்கள் நல்வாழ்வு",
      slug: "womens-wellness",
      description:
        "Specialized naturopathy programs for women's health including PCOS management, menstrual health support, and prenatal care. Our gentle, natural approach supports women through every stage of life.",
      descriptionTamil:
        "PCOS மேலாண்மை, மாதவிடாய் ஆரோக்கிய ஆதரவு மற்றும் மகப்பேறுக்கு முந்தைய பராமரிப்பு உள்ளிட்ட பெண்கள் ஆரோக்கியத்திற்கான சிறப்பு இயற்கை மருத்துவ திட்டங்கள்.",
      icon: "Heart",
      category: "specialized",
      duration: "45-60 minutes",
      price: 600,
    },
    {
      name: "Skin & Hair Care",
      nameTamil: "தோல் & முடி பராமரிப்பு",
      slug: "skin-hair-care",
      description:
        "Natural treatments for skin conditions like eczema and psoriasis, and hair problems including hair fall. Our holistic approach addresses internal imbalances to achieve lasting external results.",
      descriptionTamil:
        "அரிக்கும் தோலழற்சி, சொரியாசிஸ் போன்ற தோல் நிலைகள் மற்றும் முடி உதிர்வு உள்ளிட்ட முடி பிரச்சனைகளுக்கான இயற்கை சிகிச்சைகள்.",
      icon: "Flower2",
      category: "specialized",
      duration: "30-60 minutes",
      price: 500,
    },
    {
      name: "Diabetes & Lifestyle Disease Management",
      nameTamil: "நீரிழிவு & வாழ்க்கை முறை நோய் மேலாண்மை",
      slug: "diabetes-lifestyle-management",
      description:
        "Comprehensive naturopathy management for diabetes and other lifestyle diseases. Our program includes diet modification, exercise therapy, stress management, and regular monitoring to help control and potentially reverse these conditions.",
      descriptionTamil:
        "நீரிழிவு மற்றும் பிற வாழ்க்கை முறை நோய்களுக்கான விரிவான இயற்கை மருத்துவ மேலாண்மை. உணவு மாற்றம், உடற்பயிற்சி சிகிச்சை மற்றும் மன அழுத்த மேலாண்மை ஆகியவை அடங்கும்.",
      icon: "Activity",
      category: "specialized",
      duration: "45-60 minutes",
      price: 600,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`${services.length} services seeded`);

  // 3. Seed Doctor Profiles
  const doctors = [
    {
      name: "Dr. Ramesh Kumar",
      email: "dr.ramesh@owlihealthcare.com",
      phone: "9876543210",
      qualification: "BNYS (Bachelor of Naturopathy and Yogic Sciences)",
      specialization: "General Naturopathy & Hydrotherapy",
      experience: "8+ years",
      bio: "Dr. Ramesh Kumar is the Chief Naturopathy Physician at Owl I Health and Wellness Center. With over 8 years of experience in naturopathy, he specializes in hydrotherapy and holistic treatment approaches for chronic conditions.",
      // [PLACEHOLDER: Replace with actual doctor photo]
    },
    {
      name: "Dr. Priya Lakshmi",
      email: "dr.priya@owlihealthcare.com",
      phone: "9876543211",
      qualification: "BNYS, MSc Yoga Therapy",
      specialization: "Yoga & Rehabilitation",
      experience: "5+ years",
      bio: "Dr. Priya Lakshmi is our Yoga & Rehabilitation Specialist. Her advanced training in yogic sciences enables her to design therapeutic yoga programs for conditions ranging from back pain to anxiety disorders.",
      // [PLACEHOLDER: Replace with actual doctor photo]
    },
    {
      name: "Dr. Kavitha Sundaram",
      email: "dr.kavitha@owlihealthcare.com",
      phone: "9876543212",
      qualification: "BNYS, MSc Nutrition",
      specialization: "Nutrition & Diet Therapy",
      experience: "4+ years",
      bio: "Dr. Kavitha Sundaram specializes in nutrition and diet therapy. Her dual expertise in naturopathy and nutrition science allows her to create highly effective, personalized diet plans for various health conditions.",
      // [PLACEHOLDER: Replace with actual doctor photo]
    },
  ];

  for (const doc of doctors) {
    const existingDoc = await prisma.user.findUnique({
      where: { email: doc.email },
    });
    if (!existingDoc) {
      const passwordHash = await bcryptjs.hash("doctor123", 12);
      await prisma.user.create({
        data: {
          name: doc.name,
          email: doc.email,
          phone: doc.phone,
          passwordHash,
          role: "DOCTOR",
          doctorProfile: {
            create: {
              qualification: doc.qualification,
              specialization: doc.specialization,
              experience: doc.experience,
              bio: doc.bio,
            },
          },
        },
      });
    }
  }
  console.log(`${doctors.length} doctors seeded`);

  // 4. Seed Testimonials
  const testimonials = [
    {
      patientName: "Murugan S.",
      treatment: "Back Pain Treatment",
      content:
        "After suffering from chronic back pain for 5 years, I found relief through the naturopathy treatments at Owl I. The combination of hydrotherapy and yoga therapy has been life-changing. I can now work and play with my children without pain.",
      contentTamil:
        "5 ஆண்டுகளாக நாள்பட்ட முதுகுவலியால் அவதிப்பட்ட பிறகு, ஆவ்ல் ஐ இயற்கை மருத்துவ சிகிச்சையில் நிவாரணம் கண்டேன். நீர் சிகிச்சை மற்றும் யோகா சிகிச்சையின் கலவை என் வாழ்க்கையை மாற்றிவிட்டது.",
      rating: 5,
    },
    {
      patientName: "Lakshmi P.",
      treatment: "PCOS Management",
      content:
        "The women's wellness program helped me manage my PCOS naturally. The diet therapy and yoga sessions recommended by the doctors have significantly improved my condition. Highly recommend their holistic approach!",
      contentTamil:
        "பெண்கள் நல்வாழ்வு திட்டம் என் PCOS-ஐ இயற்கையாக நிர்வகிக்க உதவியது. மருத்துவர்கள் பரிந்துரைத்த உணவு சிகிச்சை மற்றும் யோகா அமர்வுகள் என் நிலையை கணிசமாக மேம்படுத்தியுள்ளன.",
      rating: 5,
    },
    {
      patientName: "Rajesh K.",
      treatment: "Diabetes Management",
      content:
        "I was diagnosed with Type 2 diabetes and was looking for natural ways to manage it. The diabetes management program at Owl I has helped me bring my blood sugar levels under control through diet and lifestyle changes.",
      contentTamil:
        "எனக்கு டைப் 2 நீரிழிவு கண்டறியப்பட்டது, இயற்கையான வழிகளை தேடினேன். ஆவ்ல் ஐ-யின் நீரிழிவு மேலாண்மை திட்டம் உணவு மற்றும் வாழ்க்கை முறை மாற்றங்கள் மூலம் இரத்த சர்க்கரை அளவைக் கட்டுப்படுத்த உதவியது.",
      rating: 5,
    },
    {
      patientName: "Anitha R.",
      treatment: "Stress Management",
      content:
        "The stress management program combining yoga and counseling has helped me overcome severe anxiety. The peaceful environment and caring staff make every visit a healing experience.",
      contentTamil:
        "யோகா மற்றும் ஆலோசனையை இணைக்கும் மன அழுத்த மேலாண்மை திட்டம் கடுமையான பதற்றத்தை சமாளிக்க உதவியது. அமைதியான சூழலும் அக்கறையுள்ள ஊழியர்களும் ஒவ்வொரு வருகையையும் குணப்படுத்தும் அனுபவமாக மாற்றுகிறார்கள்.",
      rating: 4,
    },
    {
      patientName: "Senthil V.",
      treatment: "Weight Management",
      content:
        "I lost 15 kg in 3 months through the weight management program. The personalized diet plan and exercise routine were easy to follow, and the results have been sustainable. Thank you, Owl I team!",
      contentTamil:
        "எடை மேலாண்மை திட்டத்தின் மூலம் 3 மாதங்களில் 15 கிலோ குறைத்தேன். தனிப்பயன் உணவுத் திட்டம் மற்றும் உடற்பயிற்சி வழக்கம் எளிதாக பின்பற்ற முடிந்தது. நன்றி, ஆவ்ல் ஐ குழு!",
      rating: 5,
    },
  ];

  for (const testimonial of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { patientName: testimonial.patientName },
    });
    if (!existing) {
      await prisma.testimonial.create({ data: testimonial });
    }
  }
  console.log(`${testimonials.length} testimonials seeded`);

  // 5. Seed Blog Posts
  const blogPosts = [
    {
      title: "5 Benefits of Hydrotherapy You Didn't Know",
      titleTamil: "நீர் சிகிச்சையின் 5 நன்மைகள் நீங்கள் அறியாதவை",
      slug: "5-benefits-of-hydrotherapy",
      excerpt:
        "Discover the surprising benefits of water-based healing therapies that have been used for centuries.",
      excerptTamil:
        "நூற்றாண்டுகளாகப் பயன்படுத்தப்படும் நீர் அடிப்படையிலான குணப்படுத்தும் சிகிச்சைகளின் ஆச்சரியமான நன்மைகளைக் கண்டறியுங்கள்.",
      content:
        "Hydrotherapy, the use of water for pain relief and treatment, has been a cornerstone of naturopathic medicine for centuries. While many people know about its basic benefits, there are several surprising advantages that make hydrotherapy a powerful healing tool.\n\n## 1. Boosts Immune Function\n\nRegular hydrotherapy sessions can significantly boost your immune system. Alternating between hot and cold water stimulates the production of white blood cells, enhancing your body's ability to fight infections and diseases.\n\n## 2. Improves Sleep Quality\n\nA warm water therapy session before bedtime can dramatically improve sleep quality. The gradual cooling of the body after treatment triggers natural sleep mechanisms, helping you fall asleep faster and enjoy deeper, more restorative sleep.\n\n## 3. Enhances Detoxification\n\nWater therapy helps open pores and stimulate sweat glands, allowing your body to release toxins more efficiently. Steam baths and hot water treatments are particularly effective for promoting deep detoxification.\n\n## 4. Reduces Chronic Pain\n\nHydrotherapy is remarkably effective for chronic pain conditions. The buoyancy of water reduces joint stress, while temperature variations help reduce inflammation and improve circulation to affected areas.\n\n## 5. Improves Mental Health\n\nWater-based therapies have a profound effect on mental well-being. The sensory experience of hydrotherapy triggers the release of endorphins and reduces cortisol levels, helping manage stress, anxiety, and depression naturally.",
      contentTamil:
        "நீர் சிகிச்சை, வலி நிவாரணம் மற்றும் சிகிச்சைக்கு நீரைப் பயன்படுத்துவது, பல நூற்றாண்டுகளாக இயற்கை மருத்துவத்தின் அடிப்படையாக இருந்து வருகிறது.\n\n## 1. நோய் எதிர்ப்பு சக்தியை அதிகரிக்கிறது\n\nதொடர்ச்சியான நீர் சிகிச்சை உங்கள் நோய் எதிர்ப்பு மண்டலத்தை கணிசமாக வலுப்படுத்தும்.\n\n## 2. தூக்கத்தின் தரத்தை மேம்படுத்துகிறது\n\nபடுக்கைக்கு முன் வெதுவெதுப்பான நீர் சிகிச்சை தூக்கத்தின் தரத்தை வியத்தகு முறையில் மேம்படுத்தும்.\n\n## 3. நச்சு நீக்கத்தை மேம்படுத்துகிறது\n\nநீர் சிகிச்சை துளைகளைத் திறந்து வியர்வை சுரப்பிகளைத் தூண்டி, நச்சுக்களை திறம்பட வெளியேற்ற உதவுகிறது.\n\n## 4. நாள்பட்ட வலியைக் குறைக்கிறது\n\nநீர் சிகிச்சை நாள்பட்ட வலி நிலைகளுக்கு குறிப்பிடத்தக்க அளவு பயனுள்ளது.\n\n## 5. மன ஆரோக்கியத்தை மேம்படுத்துகிறது\n\nநீர் சிகிச்சைகள் மன நல்வாழ்வில் ஆழமான தாக்கத்தை ஏற்படுத்துகின்றன.",
      category: "treatments",
    },
    {
      title: "Mud Therapy: Ancient Healing for Modern Ailments",
      titleTamil: "மண் சிகிச்சை: நவீன நோய்களுக்கான பண்டைய குணப்படுத்தல்",
      slug: "mud-therapy-ancient-healing",
      excerpt:
        "Learn how this traditional naturopathy treatment is finding new relevance in treating modern health conditions.",
      excerptTamil:
        "நவீன சுகாதார நிலைகளுக்கு சிகிச்சையளிப்பதில் இந்த பாரம்பரிய இயற்கை மருத்துவ சிகிச்சை எவ்வாறு புதிய பொருத்தத்தைக் கண்டறிகிறது என்பதை அறியுங்கள்.",
      content:
        "Mud therapy, one of the oldest healing practices known to humankind, has been experiencing a remarkable revival in modern naturopathy. This simple yet powerful treatment harnesses the earth's natural healing properties.\n\n## What is Mud Therapy?\n\nMud therapy involves the application of specially prepared mud or clay to the body. The mud is rich in minerals and has unique thermal properties that make it an excellent therapeutic agent.\n\n## Benefits of Mud Therapy\n\n### Detoxification\nMud has a natural ability to draw out toxins and impurities from the body through the skin.\n\n### Anti-inflammatory Properties\nThe minerals in therapeutic mud help reduce inflammation, making it effective for arthritis and joint pain.\n\n### Skin Health\nMud treatments improve skin texture, reduce acne, and can help manage conditions like eczema and psoriasis.\n\n### Improved Circulation\nMud packs stimulate blood flow, which promotes healing and nourishment of tissues.\n\n## How It Works at Owl I\n\nAt our center, we use carefully sourced and prepared mud for all treatments. Our therapists customize the application based on your specific health needs.",
      contentTamil:
        "மண் சிகிச்சை, மனிதகுலத்திற்கு அறியப்பட்ட மிகப் பழமையான குணப்படுத்தும் நடைமுறைகளில் ஒன்று, நவீன இயற்கை மருத்துவத்தில் குறிப்பிடத்தக்க மறுமலர்ச்சியை அனுபவித்து வருகிறது.\n\n## மண் சிகிச்சை என்றால் என்ன?\n\nமண் சிகிச்சை என்பது உடலில் சிறப்பாக தயாரிக்கப்பட்ட மண் அல்லது களிமண்ணை பூசுவதை உள்ளடக்கியது.\n\n## மண் சிகிச்சையின் நன்மைகள்\n\n### நச்சு நீக்கம்\nதோல் வழியாக உடலில் இருந்து நச்சுக்கள் மற்றும் அசுத்தங்களை வெளியேற்றும் இயற்கையான திறன் மண்ணுக்கு உள்ளது.\n\n### அழற்சி எதிர்ப்பு பண்புகள்\nசிகிச்சை மண்ணில் உள்ள தாதுக்கள் வீக்கத்தைக் குறைக்க உதவுகின்றன.\n\n### தோல் ஆரோக்கியம்\nமண் சிகிச்சைகள் தோலின் அமைப்பை மேம்படுத்தி, முகப்பருவைக் குறைக்கின்றன.",
      category: "treatments",
    },
    {
      title: "How Naturopathy Can Help Manage Diabetes Naturally",
      titleTamil:
        "இயற்கை மருத்துவம் நீரிழிவை இயற்கையாக நிர்வகிக்க எவ்வாறு உதவும்",
      slug: "naturopathy-diabetes-management",
      excerpt:
        "Explore how naturopathy offers a complementary approach to managing diabetes through diet, exercise, and natural therapies.",
      excerptTamil:
        "உணவு, உடற்பயிற்சி மற்றும் இயற்கை சிகிச்சைகள் மூலம் நீரிழிவை நிர்வகிக்க இயற்கை மருத்துவம் எவ்வாறு நிரப்பு அணுகுமுறையை வழங்குகிறது என்பதை ஆராயுங்கள்.",
      content:
        "Diabetes is one of the most prevalent lifestyle diseases in India, affecting millions of people. While conventional medicine plays an important role, naturopathy offers powerful complementary approaches to manage and even help reverse Type 2 diabetes.\n\n## The Naturopathic Approach to Diabetes\n\nNaturopathy addresses diabetes holistically by focusing on:\n\n### 1. Diet Therapy\nA carefully designed plant-based diet rich in fiber, whole grains, and low-glycemic foods can help stabilize blood sugar levels naturally.\n\n### 2. Yoga Therapy\nSpecific yoga asanas like Mandukasana, Paschimottanasana, and Ardha Matsyendrasana have been shown to stimulate pancreatic function and improve insulin sensitivity.\n\n### 3. Hydrotherapy\nRegular hydrotherapy sessions can improve circulation, which is often compromised in diabetic patients.\n\n### 4. Stress Management\nChronic stress raises cortisol levels, which can spike blood sugar. Naturopathic stress management techniques help maintain healthy glucose levels.\n\n## Results at Owl I\n\nMany of our patients have seen significant improvements in their HbA1c levels and have been able to reduce their medication under medical supervision.",
      contentTamil:
        "நீரிழிவு இந்தியாவில் மிகவும் பரவலான வாழ்க்கை முறை நோய்களில் ஒன்றாகும். வழக்கமான மருத்துவம் முக்கிய பங்கு வகிக்கும் அதே வேளையில், இயற்கை மருத்துவம் டைப் 2 நீரிழிவை நிர்வகிக்க சக்திவாய்ந்த நிரப்பு அணுகுமுறைகளை வழங்குகிறது.\n\n## நீரிழிவுக்கான இயற்கை மருத்துவ அணுகுமுறை\n\n### 1. உணவு சிகிச்சை\nநார்ச்சத்து நிறைந்த, தாவர அடிப்படையிலான உணவு இரத்த சர்க்கரை அளவை இயற்கையாக நிலைப்படுத்த உதவும்.\n\n### 2. யோகா சிகிச்சை\nமண்டூகாசனம், பஸ்சிமோத்தானாசனம் போன்ற குறிப்பிட்ட யோகா ஆசனங்கள் கணைய செயல்பாட்டைத் தூண்டுவதாகக் காட்டப்பட்டுள்ளது.\n\n### 3. நீர் சிகிச்சை\nதொடர்ச்சியான நீர் சிகிச்சை இரத்த ஓட்டத்தை மேம்படுத்தும்.\n\n### 4. மன அழுத்த மேலாண்மை\nநாள்பட்ட மன அழுத்தம் கார்டிசோல் அளவை உயர்த்தும், இது இரத்த சர்க்கரையை அதிகரிக்கும்.",
      category: "nutrition",
    },
    {
      title: "Yoga Asanas for Back Pain Relief",
      titleTamil: "முதுகுவலி நிவாரணத்திற்கான யோகா ஆசனங்கள்",
      slug: "yoga-asanas-back-pain-relief",
      excerpt:
        "Simple yet effective yoga poses that can help relieve back pain and strengthen your spine.",
      excerptTamil:
        "முதுகுவலியைப் போக்கவும் முதுகெலும்பை வலுப்படுத்தவும் உதவும் எளிய ஆனால் பயனுள்ள யோகா ஆசனங்கள்.",
      content:
        "Back pain is one of the most common health complaints in modern life. Whether caused by sedentary work, poor posture, or injury, yoga therapy offers effective natural relief.\n\n## Best Yoga Asanas for Back Pain\n\n### 1. Cat-Cow Pose (Marjaryasana-Bitilasana)\nThis gentle flowing movement warms up the spine and helps relieve tension in the back muscles.\n\n### 2. Child's Pose (Balasana)\nA restful pose that gently stretches the lower back and helps release tension.\n\n### 3. Cobra Pose (Bhujangasana)\nStrengthens the back muscles and improves spinal flexibility when done correctly.\n\n### 4. Bridge Pose (Setu Bandhasana)\nStrengthens the lower back and glutes while gently stretching the front of the body.\n\n### 5. Seated Forward Bend (Paschimottanasana)\nStretches the entire posterior chain, providing relief for tight hamstrings that often contribute to back pain.\n\n## Important Tips\n\n- Always warm up before attempting these poses\n- Listen to your body and never push through sharp pain\n- Practice regularly for best results\n- Consult a yoga therapist for personalized guidance",
      contentTamil:
        "முதுகுவலி நவீன வாழ்க்கையில் மிகவும் பொதுவான சுகாதார புகார்களில் ஒன்றாகும். யோகா சிகிச்சை பயனுள்ள இயற்கை நிவாரணத்தை வழங்குகிறது.\n\n## முதுகுவலிக்கான சிறந்த யோகா ஆசனங்கள்\n\n### 1. பூனை-பசு நிலை (மர்ஜர்யாசனம்-பிடிலாசனம்)\nஇந்த மென்மையான இயக்கம் முதுகெலும்பை வெப்பமாக்கி முதுகு தசைகளில் பதற்றத்தைக் குறைக்கிறது.\n\n### 2. குழந்தை நிலை (பாலாசனம்)\nகீழ் முதுகை மென்மையாக நீட்டும் ஓய்வு நிலை.\n\n### 3. நாகப்பாம்பு நிலை (புஜங்காசனம்)\nமுதுகு தசைகளை வலுப்படுத்தி முதுகெலும்பு நெகிழ்வுத்தன்மையை மேம்படுத்துகிறது.\n\n### 4. பாலம் நிலை (சேது பந்தாசனம்)\nகீழ் முதுகு மற்றும் குளுட்டீயல் தசைகளை வலுப்படுத்துகிறது.",
      category: "yoga",
    },
    {
      title: "Detox Diet: A Beginner's Guide",
      titleTamil: "நச்சு நீக்க உணவு: ஒரு தொடக்கநிலை வழிகாட்டி",
      slug: "detox-diet-beginners-guide",
      excerpt:
        "Everything you need to know about starting a naturopathic detox diet safely and effectively.",
      excerptTamil:
        "இயற்கை மருத்துவ நச்சு நீக்க உணவை பாதுகாப்பாகவும் திறம்படவும் தொடங்குவது பற்றி நீங்கள் தெரிந்து கொள்ள வேண்டிய அனைத்தும்.",
      content:
        "A detox diet is a powerful naturopathic tool for resetting your body's systems and promoting overall health. Here's everything a beginner needs to know.\n\n## What is a Detox Diet?\n\nA naturopathic detox diet involves consuming specific foods and beverages that help eliminate toxins from the body while providing essential nutrients.\n\n## Benefits of Detoxification\n\n- Improved digestion and gut health\n- Increased energy levels\n- Clearer skin\n- Better mental clarity\n- Weight management support\n\n## A Simple 3-Day Detox Plan\n\n### Day 1: Fruit Day\nConsume only fresh, seasonal fruits and plenty of water.\n\n### Day 2: Vegetable Day\nEat raw and lightly steamed vegetables with herbal teas.\n\n### Day 3: Combination Day\nMix fruits, vegetables, and light grain-based meals.\n\n## Important Guidelines\n\n- Drink at least 8-10 glasses of water daily\n- Avoid processed foods, caffeine, and sugar\n- Get adequate rest during the detox period\n- Consult a naturopathic doctor before starting any detox program",
      contentTamil:
        "நச்சு நீக்க உணவு என்பது உங்கள் உடலின் அமைப்புகளை மீட்டமைத்து ஒட்டுமொத்த ஆரோக்கியத்தை ஊக்குவிக்கும் சக்திவாய்ந்த இயற்கை மருத்துவ கருவி.\n\n## நச்சு நீக்க உணவு என்றால் என்ன?\n\nநச்சுக்களை அகற்ற உதவும் குறிப்பிட்ட உணவுகள் மற்றும் பானங்களை உட்கொள்வது.\n\n## நச்சு நீக்கத்தின் நன்மைகள்\n\n- மேம்பட்ட செரிமானம் மற்றும் குடல் ஆரோக்கியம்\n- அதிகரித்த ஆற்றல் நிலைகள்\n- தெளிவான சருமம்\n\n## எளிய 3 நாள் நச்சு நீக்க திட்டம்\n\n### நாள் 1: பழ நாள்\n### நாள் 2: காய்கறி நாள்\n### நாள் 3: கலப்பு நாள்",
      category: "nutrition",
    },
    {
      title: "Why Natural Healing is the Future of Medicine",
      titleTamil: "இயற்கை குணப்படுத்தல் மருத்துவத்தின் எதிர்காலம் ஏன்",
      slug: "natural-healing-future-medicine",
      excerpt:
        "The growing shift towards integrative and natural medicine, and why more people are choosing naturopathy.",
      excerptTamil:
        "ஒருங்கிணைந்த மற்றும் இயற்கை மருத்துவத்தை நோக்கிய வளர்ந்து வரும் மாற்றம், மேலும் அதிகமான மக்கள் ஏன் இயற்கை மருத்துவத்தை தேர்வு செய்கிறார்கள்.",
      content:
        "The global healthcare landscape is undergoing a significant transformation. More people than ever are turning to natural healing modalities, and naturopathy is at the forefront of this movement.\n\n## The Rise of Integrative Medicine\n\nHealthcare systems worldwide are recognizing that the best patient outcomes often come from integrating conventional and natural medicine approaches.\n\n## Why People Choose Natural Healing\n\n### 1. Fewer Side Effects\nNatural treatments work with the body rather than against it, resulting in minimal side effects compared to pharmaceutical interventions.\n\n### 2. Root Cause Treatment\nNaturopathy focuses on identifying and addressing the root cause of disease, not just masking symptoms.\n\n### 3. Preventive Approach\nNatural healing emphasizes prevention through lifestyle modification, diet, and stress management.\n\n### 4. Holistic Well-being\nTreatments address physical, mental, and emotional health simultaneously.\n\n### 5. Empowerment\nPatients learn to take an active role in their own health and healing.\n\n## The Future is Integrative\n\nThe most effective healthcare of the future will combine the best of both worlds — using conventional medicine for acute conditions while leveraging naturopathy for chronic disease management and prevention.",
      contentTamil:
        "உலகளாவிய சுகாதார நிலப்பரப்பு குறிப்பிடத்தக்க மாற்றத்திற்கு உள்ளாகி வருகிறது. முன்னெப்போதையும் விட அதிகமான மக்கள் இயற்கை குணப்படுத்தும் முறைகளை நோக்கி திரும்புகிறார்கள்.\n\n## ஒருங்கிணைந்த மருத்துவத்தின் எழுச்சி\n\nவழக்கமான மற்றும் இயற்கை மருத்துவ அணுகுமுறைகளை ஒருங்கிணைப்பதன் மூலம் சிறந்த நோயாளி முடிவுகள் வருகின்றன என்பதை சுகாதார அமைப்புகள் அங்கீகரிக்கின்றன.\n\n## மக்கள் ஏன் இயற்கை குணப்படுத்தலை தேர்வு செய்கிறார்கள்\n\n### 1. குறைவான பக்க விளைவுகள்\n### 2. மூல காரண சிகிச்சை\n### 3. தடுப்பு அணுகுமுறை\n### 4. முழுமையான நல்வாழ்வு\n### 5. அதிகாரமளித்தல்",
      category: "wellness",
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`${blogPosts.length} blog posts seeded`);

  // 6. Seed Public PDF entries (file references only — actual PDFs uploaded later)
  const publicPdfs = [
    {
      title: "Basic Naturopathy Diet Chart",
      titleTamil: "அடிப்படை இயற்கை மருத்துவ உணவு அட்டவணை",
      category: "diet",
      description: "A comprehensive daily diet chart following naturopathy principles for general wellness.",
      fileName: "basic-naturopathy-diet-chart.pdf",
      filePath: "./uploads/public-pdfs/basic-naturopathy-diet-chart.pdf",
      fileSize: 0,
    },
    {
      title: "Beginner Yoga Routine",
      titleTamil: "தொடக்கநிலை யோகா வழக்கம்",
      category: "yoga",
      description: "A step-by-step yoga routine designed for beginners with illustrations and instructions.",
      fileName: "beginner-yoga-routine.pdf",
      filePath: "./uploads/public-pdfs/beginner-yoga-routine.pdf",
      fileSize: 0,
    },
    {
      title: "Home Exercise Guide",
      titleTamil: "வீட்டு உடற்பயிற்சி வழிகாட்டி",
      category: "exercise",
      description: "Simple exercises you can do at home to maintain fitness and flexibility.",
      fileName: "home-exercise-guide.pdf",
      filePath: "./uploads/public-pdfs/home-exercise-guide.pdf",
      fileSize: 0,
    },
    {
      title: "Healthy Lifestyle Tips",
      titleTamil: "ஆரோக்கியமான வாழ்க்கை முறை குறிப்புகள்",
      category: "lifestyle",
      description: "Practical tips for maintaining a healthy lifestyle through naturopathy principles.",
      fileName: "healthy-lifestyle-tips.pdf",
      filePath: "./uploads/public-pdfs/healthy-lifestyle-tips.pdf",
      fileSize: 0,
    },
    {
      title: "Diabetes-Friendly Meal Plan",
      titleTamil: "நீரிழிவு நட்பு உணவுத் திட்டம்",
      category: "diet",
      description: "A 7-day meal plan designed for people managing diabetes through naturopathic diet therapy.",
      fileName: "diabetes-friendly-meal-plan.pdf",
      filePath: "./uploads/public-pdfs/diabetes-friendly-meal-plan.pdf",
      fileSize: 0,
    },
  ];

  for (const pdf of publicPdfs) {
    const existing = await prisma.publicPdf.findFirst({
      where: { fileName: pdf.fileName },
    });
    if (!existing) {
      await prisma.publicPdf.create({ data: pdf });
    }
  }
  console.log(`${publicPdfs.length} public PDFs seeded`);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
