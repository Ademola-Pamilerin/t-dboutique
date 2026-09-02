'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import AuthGuard from '../components/AuthGuard';
import {
  Package,
  ArrowLeft,
  RefreshCw,
  Eye,
  ChevronDown,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ShoppingBag,
  User,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import toast from 'react-hot-toast';

type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
  size: string | null;
  color: string | null;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  customer_address: string | null;
  total_amount: number;
  status: OrderStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pending:   { label: 'Pending',   color: '#FBBF24', bg: 'rgba(251,191,36,0.1)',  icon: <Clock className="w-3.5 h-3.5" /> },
  confirmed: { label: 'Confirmed', color: '#34D399', bg: 'rgba(52,211,153,0.1)',  icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  shipped:   { label: 'Shipped',   color: '#60A5FA', bg: 'rgba(96,165,250,0.1)',  icon: <Truck className="w-3.5 h-3.5" /> },
  delivered: { label: 'Delivered', color: '#D4AF37', bg: 'rgba(212,175,55,0.1)', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
  cancelled: { label: 'Cancelled', color: '#F87171', bg: 'rgba(248,113,113,0.1)', icon: <XCircle className="w-3.5 h-3.5" /> },
};

function OrdersPageInner() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load orders.');
      console.error(error);
    } else {
      setOrders(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingStatus(orderId);
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast.error('Failed to update order status.');
    } else {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      toast.success(`Order status updated to ${newStatus}.`, { icon: '✅' });
    }
    setUpdatingStatus(null);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-NG', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  const formatAmount = (amount: number) =>
    `₦${amount.toLocaleString('en-NG')}`;

  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-inter">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Link>
            <div className="w-px h-5 bg-zinc-700" />
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" style={{ color: '#D4AF37' }} />
              <h1 className="text-lg font-bold text-white">Orders</h1>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-zinc-800 text-zinc-400">
                {orders.length}
              </span>
            </div>
          </div>
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 text-xs font-medium transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Status Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {(Object.entries(STATUS_CONFIG) as [OrderStatus, typeof STATUS_CONFIG[OrderStatus]][]).map(([status, cfg]) => (
            <div key={status} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: cfg.bg, color: cfg.color }}>
                {cfg.icon}
              </div>
              <div>
                <p className="text-lg font-bold text-white">{statusCounts[status] ?? 0}</p>
                <p className="text-xs text-zinc-500">{cfg.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#D4AF37', borderTopColor: 'transparent' }} />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 font-medium">No orders yet</p>
            <p className="text-zinc-600 text-sm mt-1">Orders placed by customers will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              const cfg = STATUS_CONFIG[order.status];
              const isExpanded = expandedOrder === order.id;
              return (
                <div key={order.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden transition-all">
                  {/* Order Row */}
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Left info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono text-zinc-500">#{order.id.slice(0, 8).toUpperCase()}</span>
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ color: cfg.color, background: cfg.bg }}
                        >
                          {cfg.icon}
                          {cfg.label}
                        </span>
                      </div>
                      <p className="font-semibold text-white">{order.customer_name}</p>
                      <div className="flex items-center gap-4 text-xs text-zinc-500 flex-wrap">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{order.customer_email}</span>
                        {order.customer_phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{order.customer_phone}</span>}
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <p className="font-bold text-lg" style={{ color: '#D4AF37' }}>{formatAmount(order.total_amount)}</p>
                      <p className="text-xs text-zinc-500">{formatDate(order.created_at)}</p>
                    </div>

                    {/* Status Selector */}
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                        disabled={updatingStatus === order.id}
                        className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-zinc-700 bg-zinc-800 text-white text-xs font-medium cursor-pointer focus:outline-none focus:border-yellow-500 disabled:opacity-50"
                      >
                        {(Object.keys(STATUS_CONFIG) as OrderStatus[]).map((s) => (
                          <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
                    </div>

                    {/* Expand button */}
                    <button
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs font-medium transition-all border border-zinc-700"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Details
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-zinc-800 p-5 space-y-4 bg-zinc-950/50">
                      {/* Address */}
                      {order.customer_address && (
                        <div className="flex items-start gap-2 text-sm text-zinc-400">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                          <span>{order.customer_address}</span>
                        </div>
                      )}
                      {order.notes && (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-400">
                          <span className="text-zinc-500 font-medium">Note: </span>{order.notes}
                        </div>
                      )}

                      {/* Order Items */}
                      {order.order_items && order.order_items.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Items</p>
                          <div className="space-y-2">
                            {order.order_items.map((item) => (
                              <div key={item.id} className="flex items-center gap-3 bg-zinc-900 rounded-lg p-3 border border-zinc-800">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.product_image} alt={item.product_name} className="w-12 h-12 rounded-lg object-cover bg-zinc-800 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-white truncate">{item.product_name}</p>
                                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                                    {item.size && <span>Size: {item.size}</span>}
                                    {item.color && <span>Color: {item.color}</span>}
                                    <span>Qty: {item.quantity}</span>
                                  </div>
                                </div>
                                <p className="text-sm font-bold text-white">{formatAmount(item.price * item.quantity)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Total */}
                      <div className="flex justify-end items-center gap-2 border-t border-zinc-800 pt-3">
                        <span className="text-sm text-zinc-500">Total</span>
                        <span className="text-lg font-bold" style={{ color: '#D4AF37' }}>{formatAmount(order.total_amount)}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <AuthGuard>
      <OrdersPageInner />
    </AuthGuard>
  );
}
