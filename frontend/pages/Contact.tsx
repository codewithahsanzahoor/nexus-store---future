
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 animate-in fade-in duration-700">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase italic leading-none">Get In <span className="text-primary not-italic">Touch</span></h1>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">Whether you're building your first rig or upgrading to the ultimate setup, the Nexus team is here to help you evolve.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-12">
          {[
            { icon: 'alternate_email', title: 'Email Us', info: 'support@nexusstore.com', desc: 'Technical Support & Sales' },
            { icon: 'call', title: 'Call Us', info: '+92 (51) 123-4567', desc: 'Mon-Fri, 9am - 6pm' },
            { icon: 'distance', title: 'Islamabad HQ', info: 'Level 4, Tech Plaza, Blue Area', desc: 'Nexus HQ' }
          ].map(item => (
            <div key={item.title} className="flex gap-6 group">
              <div className="size-14 bg-surface-dark border border-primary/20 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary/10 transition-all">
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <div>
                <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-1">{item.title}</h4>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{item.desc}</p>
                <p className="text-primary font-bold">{item.info}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-dark border border-white/5 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="material-symbols-outlined text-[150px] text-primary">send</span>
          </div>
          <form className="space-y-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                <input className="w-full bg-background-dark/50 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email</label>
                <input className="w-full bg-background-dark/50 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="john@nexus.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Message</label>
              <textarea rows={5} className="w-full bg-background-dark/50 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none" placeholder="Describe your inquiry..."></textarea>
            </div>
            <button className="w-full bg-primary text-background-dark font-black py-5 rounded-xl uppercase tracking-widest text-lg shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3">
              Send Message <span className="material-symbols-outlined font-black">north_east</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
